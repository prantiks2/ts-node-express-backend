import { pbkdf2 } from 'node:crypto';
import { constants } from '../config/constants';
import { JwtPayload, VerifyErrors, sign, verify } from 'jsonwebtoken'

export function getHashedPassword(password: string): Promise<string> {
    return new Promise((resolve, reject) => {
        pbkdf2(password, constants.passwordSalt, 1000, 64, 'sha256', (err, key) => {
            if (err) {
                reject(err);
            } else {
               resolve(key.toString('hex'));
            }
        });
    });
};

export function getTokens(data: string | Object | Buffer) {
    return {
        accessToken: sign(
            data,
            constants.accessTokenSecret,
            {expiresIn: constants.accessTokenExpiryTimeInSecs}
            ),
        refreshToken: sign(
            data,
            constants.refreshTokenSecret,
            {expiresIn: constants.refreshTokenExpiryTimeInSecs}
            ,)
    }
};

export function verifyToken(token: string, secret: string): Promise<{status: 'success' | 'failed', err?: VerifyErrors | null, data: string | JwtPayload | undefined | null}>{
    return new Promise((resolve) => {
        verify(token, secret, (err, res) => {
            if (err) {
                resolve({status: 'failed', data: null, err})
            } else {
                resolve({status: 'success', data: res});
            }
        });
    });
};


export function getRandomString(length: number) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789$%^&*@#!';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
};
