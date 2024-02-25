import { Request, Response } from "express";

export async function appInfo(req: Request, res: Response) {
    try {
        const info = {
            name: 'TS Node Express Backend'
        }
        return res.status(200).json({ message: 'Server is running', data: info });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ status: 500, message: 'Something went wrong, try again later', error: error });
    }
}