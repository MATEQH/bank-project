import api from "../api/client.ts";

export interface User {
    email: string;
    accounts: Account[];
}

interface Account {
    accountNumber: string;
    balance: number;
    currency: string;
}

export const loginRequest = async (email: string, password: string) => {
    const res = await api.post("/auth/login", { email, password });
    if (res.data.error) {
        throw new Error(res.data.error);
    }
    return res.data; // { token }
}

export const registerRequest = async (email: string, password: string) => {
    const res = await api.post("/auth/register", { email, password });
    if (res.data.error) {
        throw new Error(res.data.error);
    }
    return res.data;
}