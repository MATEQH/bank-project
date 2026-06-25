import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { registerRequest } from "../auth/auth-api.ts";
import { Link, useNavigate } from "@tanstack/react-router";
import type { AxiosError } from "axios";
import { toast } from "react-toastify";

export type RegisterCredentials = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    passwordConfirm: string;
}

export const Register = () => {
    const [credentials, setCredentials] = useState<RegisterCredentials>({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        passwordConfirm: ""
    });
    const navigate = useNavigate();

    const mutation = useMutation({
        mutationFn: async () => await registerRequest(credentials),
        onError: async (error: AxiosError<{message: string}>) => {
            toast.error(error.response?.data?.message || "An error occurred");
        },
        onSuccess: async () => {
            toast.success("You have successfully registered.");
            await navigate({ to: "/auth/login" });
        }
    })

    return (
        <div className={"w-full min-h-dvh flex justify-center items-center px-2"}>
            <form
                className={"w-full max-w-md md:max-w-xl text-white flex flex-col gap-y-4 p-8 rounded-3xl shadow-2xl shadow-zinc-800 font-mono"}
                onSubmit={(e) => {
                    e.preventDefault();
                    mutation.mutate();
                }}>
                <div className={"flex flex-col items-center text-center border-b pb-4"}>
                    <h2 className={"text-4xl font-semibold self-center uppercase"}>Your Bank</h2>
                    <p>At here you can create a new bank account</p>
                </div>

                <div className={"flex flex-col md:flex-row md:justify-between md:gap-x-4 gap-y-4"}>
                    <div className={"w-full flex flex-col gap-y-2"}>
                        <label htmlFor={"firstName"}>First name</label>
                        <input
                            className={"border rounded-3xl shadow-2xl shadow-zinc-800 h-8 pl-2 text-gray-600"}
                            id={"firstName"}
                            placeholder={"Matthew"}
                            onChange={(e) => setCredentials({...credentials, firstName: e.target.value})}
                            value={credentials.firstName}
                        />
                    </div>
                    <div className={"w-full flex flex-col gap-y-2"}>
                        <label htmlFor={"lastName"}>Last name</label>
                        <input
                            className={"border rounded-3xl shadow-2xl shadow-zinc-800 h-8 pl-2 text-gray-600"}
                            id={"lastName"}
                            placeholder={"Miller"}
                            onChange={(e) => setCredentials({...credentials, lastName: e.target.value})}
                            value={credentials.lastName}
                        />
                    </div>
                </div>

                <div className={"flex flex-col gap-y-2"}>
                    <label htmlFor={"email"}>Email</label>
                    <input
                        className={"border rounded-3xl shadow-2xl shadow-zinc-800 h-8 pl-2 text-gray-600"}
                        id={"email"}
                        type={"email"}
                        placeholder={"matthew.miller@gmail.com"}
                        onChange={(e) => setCredentials({...credentials, email: e.target.value})}
                        value={credentials.email}
                    />
                </div>

                <div className={"flex flex-col gap-y-2"}>
                    <label htmlFor={"password"}>Password</label>
                    <input
                        className={"border rounded-3xl shadow-2xl shadow-zinc-800 h-8 pl-2 text-gray-600"}
                        id={"password"}
                        type={"password"}
                        placeholder={"***********"}
                        onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                        value={credentials.password}
                    />
                </div>

                <div className={"flex flex-col gap-y-2"}>
                    <label htmlFor={"passwordConfirm"}>Password confirm</label>
                    <input
                        className={"border rounded-3xl shadow-2xl shadow-zinc-800 h-8 pl-2 text-gray-600"}
                        id={"passwordConfirm"}
                        type={"password"}
                        placeholder={"***********"}
                        onChange={(e) => setCredentials({...credentials, passwordConfirm: e.target.value})}
                        value={credentials.passwordConfirm}
                    />
                </div>

                <button className={"border-green-600 border rounded-3xl shadow-2xl shadow-zinc-800 h-10 font-semibold transition-all duration-300 hover:scale-95 mt-8 text-white"} disabled={mutation.isPending}>
                    {mutation.isPending ? "Loading..." : "Register"}
                </button>
                <span className={"text-center"}>You already have an account? <Link className={"hover:underline"} to={"/auth/login"}>Click here</Link></span>
            </form>
        </div>
    );
};

export default Register;