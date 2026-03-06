import api from "../api/client.ts";
import type { RegisterCredentials } from "../routes/register.tsx";
import type { LoginCredentials } from "../routes/login.tsx";

export type User = {
    firstName: string;
    lastName: string;
    email: string;
    accounts: Account[];
}

type Account = {
    accountNumber: string;
    balance: number;
    currency: string;
}

export const loginRequest = async (credentials: LoginCredentials) => {
    const res = await api.post("/auth/login", {...credentials});
    if (res.data.error) {
        throw new Error(res.data.error);
    }
    return res.data; // { token }
}

export const registerRequest = async (credentials: RegisterCredentials) => {
    const res = await api.post("/auth/register", {...credentials});
    if (res.data.error) {
        throw new Error(res.data.error);
    }
    return res.data;
}

export const createAccount = async () => {
    const res = await api.post("/account/create");
    if (res.data.error) {
        throw new Error(res.data.error);
    }
    return res.data;
}

export const closeAccount = async (accountNumber: string) => {
    const res = await api.post("/account/close", {accountNumber: accountNumber});
    if (res.data.error) {
        throw new Error(res.data.error);
    }
    return res.data;
}

export const freezeAccount = async (accountNumber: string) => {
    const res = await api.post("/account/freeze", {accountNumber: accountNumber});
    if (res.data.error) {
        throw new Error(res.data.error);
    }
    return res.data;
}