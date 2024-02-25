import express from 'express';
import { joiValidationMiddleware } from '../middlewares/joi-validate-request.middleware';
import { userLogin, refreshToken, logout } from '../controllers/authentication.controller';
import { userLoginSchema, refreshTokenSchema } from '../joi-validation-schemas/authentication.joi';
export const authenticationRouter = express.Router();

authenticationRouter.post('/login', joiValidationMiddleware(userLoginSchema, 'body'), userLogin);
authenticationRouter.put('/refresh-token/:refreshToken', joiValidationMiddleware(refreshTokenSchema, 'params'), refreshToken);
authenticationRouter.delete('/logout/:refreshToken', joiValidationMiddleware(refreshTokenSchema, 'params'), logout);
