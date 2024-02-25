
import express from 'express';
import { joiValidationMiddleware } from '../middlewares/joi-validate-request.middleware';
import { changePasswordSchema, createUserSchema, deleteUserSchema, forgotPasswordSchema, resetPasswordSchema } from '../joi-validation-schemas/user.joi';
import { changePassword, createNewUser, forgotPassword, resetPassword } from '../controllers/user.controller';
import { deleteUser } from '../repositories/user.repository';
import { validate } from '../middlewares/authorization.middleware';

export const userRouter = express.Router();

userRouter.post('/user', joiValidationMiddleware(createUserSchema, 'body'), createNewUser);
userRouter.delete('/user/:email', joiValidationMiddleware(deleteUserSchema, 'params'), deleteUser);
userRouter.patch('/change-password', validate, joiValidationMiddleware(changePasswordSchema, 'body'), changePassword);
userRouter.post('/forgot-password',  joiValidationMiddleware(forgotPasswordSchema, 'body'), forgotPassword);
userRouter.patch('/reset-password',  joiValidationMiddleware(resetPasswordSchema, 'body'), resetPassword);
