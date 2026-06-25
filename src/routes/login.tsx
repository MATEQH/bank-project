import {useState} from "react";
import {useMutation} from "@tanstack/react-query";
import {loginRequest} from "../auth/auth-api.ts";
import {Link, useNavigate} from "@tanstack/react-router";
import type {AxiosError} from "axios";
import {toast} from "react-toastify";
import {useAppDispatch} from "../store/hooks.ts";
import {login} from "../store/authSlice.ts";

export type LoginCredentials = {
    email: string;
    password: string;
}

export const Login = () => {
    const [credentials, setCredentials] = useState<LoginCredentials>({
        email: "",
        password: ""
    });
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const mutation = useMutation({
        mutationFn: async () => await loginRequest(credentials),
        onError: async (error: AxiosError<{ message: string }>) => {
            toast.error(error.response?.data?.message || "An error occurred");
        },
        onSuccess: async (data) => {
            toast.success("You are now logged in");
            try {
                await dispatch(login(data.token));
                await navigate({to: "/"});
            } catch (error) {
                toast.error("Failed to load user profile after login.");
            }
        }
    });

    return (
        <div className={"w-full min-h-dvh flex justify-center items-center px-2"}>
            <form
                className={"w-full max-w-md md:max-w-xl text-white flex flex-col gap-y-4 rounded-3xl shadow-2xl shadow-zinc-800 p-8 font-mono"}
                onSubmit={(e) => {
                    e.preventDefault();
                    mutation.mutate();
                }}>
                <div className={"flex flex-col items-center text-center border-b pb-4"}>
                    <h2 className={"text-4xl font-semibold self-center uppercase"}>Your Bank</h2>
                    <p>At here you can login to your bank account</p>
                </div>

                <div className={"flex flex-col gap-y-2"}>
                    <label htmlFor={"email"}>Email</label>
                    <input
                        className={"border rounded-3xl shadow-2xl shadow-zinc-800 h-8 pl-2 text-gray-600"}
                        id={"email"}
                        type={"email"}
                        placeholder={"example@gmail.com"}
                        onChange={(e) => setCredentials({...credentials, email: e.target.value})}
                        value={credentials.email}
                    />
                </div>

                <div className={"flex flex-col gap-y-2"}>
                    <div className={"flex justify-between"}>
                        <label htmlFor={"password"}>Password</label>
                        <span className={"text-xs place-self-end hover:underline cursor-pointer text-green-600"}>Forgot your password?</span>
                    </div>
                    <input
                        className={"border rounded-3xl shadow-2xl shadow-zinc-800 h-8 pl-2 text-gray-600"}
                        id={"password"}
                        type={"password"}
                        placeholder={"***********"}
                        onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                        value={credentials.password}
                    />
                </div>

                <button
                    className={"border-green-600 border rounded-3xl shadow-2xl shadow-zinc-800 h-10 font-semibold transition-all duration-300 hover:scale-95 mt-8 text-white"}
                    disabled={mutation.isPending}>
                    {mutation.isPending ? "Loading..." : "Login"}
                </button>
                <span className={"text-center"}>You don't have account? <Link className={"hover:underline"}
                                                                              to={"/auth/register"}>Click here</Link></span>
            </form>
        </div>
    );
};

export default Login;