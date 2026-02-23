import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { registerRequest } from "../auth/auth-api.ts";
import { Link, useNavigate } from "@tanstack/react-router";

export const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const mutation = useMutation({
        mutationFn: async () => await registerRequest(email, password),
        onError: async (error) => {
          alert("Error: " + error.message)
        },
        onSuccess: async () => {
            await navigate({ to: "/auth/login" });
        }
    })

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
                    <p>At here you can create a new bank account</p>
                </div>

                <div className={"flex flex-col gap-y-2"}>
                    <label htmlFor={"email"}>Email</label>
                    <input
                        className={"border rounded-lg h-8 pl-2 text-gray-600"}
                        id={"email"}
                        type={"email"}
                        placeholder={"example@gmail.com"}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className={"flex flex-col gap-y-2"}>
                    <label htmlFor={"password"}>Password</label>
                    <input
                        className={"border rounded-lg h-8 pl-2 text-gray-600"}
                        id={"password"}
                        type={"password"}
                        placeholder={"***********"}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <div className={"flex flex-col gap-y-2"}>
                    <label htmlFor={"password_confirm"}>Password confirm</label>
                    <input
                        className={"border rounded-lg h-8 pl-2 text-gray-600"}
                        id={"password_confirm"}
                        type={"password"}
                        placeholder={"***********"}
                        //onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <button className={"border rounded-2xl h-8 font-semibold transition-all duration-300 hover:scale-95 mt-8"} disabled={mutation.isPending}>
                    {mutation.isPending ? "Loading..." : "Register"}
                </button>
                <span className={"text-center"}>You already have an account? <Link className={"hover:underline"} to={"/auth/login"}>Click here</Link></span>
            </form>
        </div>
    );
};

export default Register;