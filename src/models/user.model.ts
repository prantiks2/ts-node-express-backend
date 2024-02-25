export interface User {
    name: string;
    email: string;
    password: string;
}

export interface UpdateUser {
    name?: string;
    email?: string;
    password?: string;
}
