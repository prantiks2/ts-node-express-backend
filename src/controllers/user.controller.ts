import { Request, Response } from "express";
import { getHashedPassword, getRandomString } from "../helpers/common";
import { findUser, createUser, deleteUser, updateUser } from "../repositories/user.repository";
import { createVerification, findVerification } from "../repositories/verification.repository";
import { MailConfigurations, sendMail } from "../helpers/emailer";
import { otpTemplate } from "../helpers/templates";


export async function createNewUser(req: Request, res: Response) {
    try {
        const hashedPassword = await getHashedPassword(req.body.password);
        const result = await findUser({email: req.body.email});
        if (result) {
            return res.status(409).json({ message: 'Email ID already in use, please use a different email ID', data: req.body });
        }
        await createUser({
            name: req.body.name,
            email: req.body.email, 
            password: hashedPassword,
        });
        return res.status(201).json({ message: 'User Account created successfully', data: req.body });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ status: 500, message: 'Something went wrong, try again later', data: error });
    }
}

export async function deleteExistingUser(req: Request, res: Response) {
    try {
        const result = await findUser({email: req.params.email});
        if (result) {
            await deleteUser({
                email: req.params.email,
            });
            return res.status(200).json({ message: 'User Account deleted successfully', data: req.body });
        } else {
            return res.status(404).json({ message: 'User does not exist', data: req.body });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ status: 500, message: 'Something went wrong, try again later', data: error });
    }
}

export async function changePassword(req: Request, res: Response) {
    try {
        const hashedPassword = await getHashedPassword(req.body.currentPassword);
        const hashedNewPassword = await getHashedPassword(req.body.newPassword);
        const user = await findUser({email: res.locals.auth.email});
        if (user?.password===hashedPassword) {
            await updateUser({email: res.locals.auth.email}, { $set: { 'password' : hashedNewPassword } });
            return res.status(200).json({ message: 'Password updated successfully', data: null });
        } else {
            return res.status(403).json({ message: 'Current password does not match', data: req.body });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ status: 500, message: 'Something went wrong, try again later', data: error });
    }
}

export async function forgotPassword(req: Request, res: Response) {
    try {
        const user = await findUser({email: req.body.email});
        if (user) {
            const codeValidForMinutes = 3; // valid for 3 minutes
            const validTill = new Date(new Date().getTime() + (codeValidForMinutes*60*1000));
            const code = getRandomString(12);
            await createVerification({
                purpose: 'reset-password-secret',
                value: code,
                email: req.body.email,
                expireAt: validTill,
            });
            const email = new MailConfigurations(
                'support@ablazeon.com',
                req.body.email,
                'Reset password verification',
                otpTemplate.replace('{{msg}}', `Please use the following verification code to reset your password. The code is valid for ${codeValidForMinutes} minutes.`).replace('{{otp}}', code)
            );
            sendMail(email);
            return res.status(200).json({ message: `Email sent to ${req.body.email} with reset password instructions`, data: {validTill, email: req.body.email} });
        } else {
            return res.status(404).json({ message: 'User does not exist', data: req.body });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ status: 500, message: 'Something went wrong, try again later', data: error });
    }
}

export async function resetPassword(req: Request, res: Response) {
    try {
        const verification = await findVerification({email: req.body.email, value: req.body.secretKey, purpose: 'reset-password-secret'}); 
        if (verification) {
            const hashedNewPassword = await getHashedPassword(req.body.newPassword);
            await updateUser({email: req.body.email}, { $set: { 'password' : hashedNewPassword } });
            return res.status(200).json({ message: 'Password has been reset succcessfully', data: req.body });
        } else {
            return res.status(403).json({ message: 'Invalid or expired verification code', data: req.body });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ status: 500, message: 'Something went wrong, try again later', data: error });
    }
}