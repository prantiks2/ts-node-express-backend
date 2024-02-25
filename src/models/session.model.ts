export interface Session {
    user: string;
    refreshToken: string;
    expireAt: Date;
}