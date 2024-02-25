import { Request, Response } from "express";
import { getHashedPassword, getTokens, verifyToken } from "../helpers/common";
import { findUser } from "../repositories/user.repository";
import { createSession, deleteSession, findSession } from "../repositories/session.repository";
import { constants } from '../config/constants';
import { JwtPayload } from "jsonwebtoken";

export async function userLogin(req: Request, res: Response) {
    try {
        const hashedPassword = await getHashedPassword(req.body.password);
        const result = await findUser({email: req.body.email, password: hashedPassword});
        if (result) {
            const responseObj = getTokens({email: req.body.email});
            await createSession({
                user: req.body.email,
                refreshToken: responseObj.refreshToken,
                expireAt: new Date(new Date().getTime() + (constants.refreshTokenExpiryTimeInSecs*1000))
            });
            return res.status(200).json({ message: 'Login Successful', data: responseObj });
        } else {
            return res.status(403).json({ message: 'Login Failed, Invalid credentials', data: req.body });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ status: 500, message: 'Something went wrong, try again later', data: error });
    }
}

export async function refreshToken(req: Request, res: Response) {
    try {
        const result = await verifyToken(req.params.refreshToken, constants.refreshTokenSecret);
        if (result.status === 'failed') {
            return res.status(401).json({ message: result.err?.message, data: null });
        }
        const email = (result.data as JwtPayload)?.email as string;
        const session = await findSession({
            user: email,
            refreshToken: req.params.refreshToken
        });
        if (session) {
            const responseObj = getTokens({email});
            // create new session with new acccess tokens
            createSession({
                user: email,
                refreshToken: responseObj.refreshToken,
                expireAt: new Date(new Date().getTime() + (constants.refreshTokenExpiryTimeInSecs*1000))
            });
            // delete old session data
            deleteSession({refreshToken: req.params.refreshToken});
            return res.status(200).json({message: 'Tokens Refreshed', data: responseObj});
        } else {
            return res.status(401).json({message: 'Invalid Token', data: null});
        }
    }
    catch (error) {
        console.log('err', error);
        return res.status(500).json({status: 500, message: 'Something went wrong, try again later', data: error});
    }
}

export async function logout(req: Request, res: Response) {
    try {
        deleteSession({refreshToken: req.params.refreshToken});
        return res.status(200).json({message: 'Session deleted', data: null});
    }
    catch (error) {
        console.log('err', error);
        return res.status(500).json({status: 500, message: 'Something went wrong, try again later', data: error});
    }
}