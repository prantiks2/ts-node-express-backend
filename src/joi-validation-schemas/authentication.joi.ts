import Joi from 'joi';

export const userLoginSchema = Joi.object({
    email: Joi.string().email().required().label('Email'),
    password: Joi.string().required().label('Password'),
});

export const refreshTokenSchema = Joi.object({
    refreshToken: Joi.string().required().label('Refresh Token'),
});