import { NextFunction, Request, Response } from 'express';
import { constants } from '../config/constants';
import { verifyToken } from '../helpers/common';

export async function validate(req: Request, res: Response, next: NextFunction) {
    const result = await verifyToken(req.headers.authorization || '', constants.accessTokenSecret);
    if (result.status==='failed') {
        return res.status(401).json({message: 'Invalid Access Token', data: result.data});
    } else {
        res.locals.auth = result.data;
        next();
    } 
}