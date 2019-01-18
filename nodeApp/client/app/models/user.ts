export interface User {
    name: string;
    email: string;
    address: string,
    role: string,
    password: string,
    userId: string
}

export interface LoginData {
    email: string,
    password: string
}
