import Joi from 'joi';

export const createUserSchema = Joi.object({
    name: Joi.string().alphanum().max(10).required().label('Username'),
    email: Joi.string().email().required().label('Email'),
    password: Joi.string().min(8).max(25).pattern(/[~!@#$%^&*_|]+/).required().label('Password'),
    confirmPassword: Joi.string().equal(Joi.ref('password')).required().messages({'any.only': 'Confirm Password must match Password'}),
});

export const deleteUserSchema = Joi.object({
    email: Joi.string().email().required().label('Email'),
});

export const changePasswordSchema = Joi.object({
    currentPassword: Joi.string().required().label('Current Password'),
    newPassword: Joi.string().min(8).max(25).pattern(/[~!@#$%^&*_|]+/).required().label('New Password'),
    confirmPassword: Joi.string().equal(Joi.ref('newPassword')).required().messages({'any.only': 'Confirm Password must match New Password'}),
});

export const forgotPasswordSchema = Joi.object({
    email: Joi.string().email().required().label('Email'),
});

export const resetPasswordSchema = Joi.object({
    email: Joi.string().email().required().label('Email'),
    secretKey: Joi.string().required().label('Secret Key'),
    newPassword: Joi.string().min(8).max(25).pattern(/[~!@#$%^&*_|]+/).required().label('New Password'),
    confirmPassword: Joi.string().equal(Joi.ref('newPassword')).required().messages({'any.only': 'Confirm Password must match New Password'}),
});