import express from 'express';
import { appInfo } from "../controllers/app.controller";

export const appInfoRouter = express.Router();

appInfoRouter.get('/', appInfo);