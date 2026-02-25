import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { loginRequest } from "../auth/auth-api.ts";
import { Link, useNavigate } from "@tanstack/react-router";
import { useAuth } from "../auth/use-auth.ts";

export interface LoginCredentials {
    email: string;
    password: string;
}

export const Login = () => {
    const [credentials, setCredentials] = useState<LoginCredentials>({
        email: "",
        password: ""
    });
    const {login} = useAuth();
    const navigate = useNavigate();

    const mutation = useMutation({
        mutationFn: async () => await loginRequest(credentials),
        onError: async (error) => {
            alert("Error: " + error.message)
        },
        onSuccess: async (data) => {
            await login(data.token);
            await navigate({to: "/"});
        }
    });

    return (
        <div className={"w-full min-h-dvh flex justify-center items-center px-2 text-white"}>
            <form
                className={"w-full max-w-md md:max-w-xl flex flex-col gap-y-4 bg-green-500 p-8 rounded-3xl"}
                onSubmit={(e) => {
                    e.preventDefault();
                    mutation.mutate();
                }}>
                <div className={"flex flex-col items-center text-center"}>
                    <h2 className={"text-4xl font-semibold self-center uppercase"}>Bank Project</h2>
                    <p>At here you can login to your bank account</p>
                </div>

                <div className={"flex flex-col gap-y-2"}>
                    <label htmlFor={"email"}>Email</label>
                    <input
                        className={"border rounded-lg h-8 pl-2 text-gray-600"}
                        id={"email"}
                        type={"email"}
                        placeholder={"example@gmail.com"}
                        onChange={(e) => setCredentials({...credentials, email: e.target.value})}
                    />
                </div>

                <div className={"flex flex-col gap-y-2"}>
                    <div className={"flex justify-between"}>
                        <label htmlFor={"password"}>Password</label>
                        <span className={"text-xs place-self-end hover:underline cursor-pointer"}>Forgot your password?</span>
                    </div>
                    <input
                        className={"border rounded-lg h-8 pl-2 text-gray-600"}
                        id={"password"}
                        type={"password"}
                        placeholder={"***********"}
                        onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                    />
                </div>

                <button className={"border rounded-2xl h-8 font-semibold transition-all duration-300 hover:scale-95 mt-8"} disabled={mutation.isPending}>
                    {mutation.isPending ? "Loading..." : "Login"}
                </button>
                <span className={"text-center"}>You don't have account? <Link className={"hover:underline"} to={"/auth/register"}>Click here</Link></span>
            </form>
        </div>
    );
};

export default Login;