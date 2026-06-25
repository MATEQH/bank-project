import { IoIosAddCircleOutline, IoIosArrowForward } from "react-icons/io";
import { Link } from "@tanstack/react-router";
import { GiTakeMyMoney } from "react-icons/gi";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import type {AxiosError} from "axios";
import {toast} from "react-toastify";
import {type Account, createAccount} from "../auth/auth-api.ts";
import React, { useState } from 'react';
import { HiOutlineMail, HiOutlineLockClosed, HiOutlineEye, HiOutlineEyeOff } from 'react-icons/hi';
import {useAppSelector} from "../store/hooks.ts";

export const Accounts = () => {
    const queryClient = useQueryClient();
    const user = useAppSelector((state) => state.auth.user);

    const createAccountMutation = useMutation({
        mutationFn: async () => await createAccount(),
        onError: async (error: AxiosError<{message: string}>) => {
            toast.error(error.response?.data?.message || "An error occurred");
        },
        onSuccess: async (data) => {
            await queryClient.invalidateQueries({queryKey: ["me"]});
            toast.success(data?.message);
        }
    });

    return (
        <div className={"flex flex-col rounded-3xl shadow-2xl shadow-zinc-800 p-5 gap-y-4"}>
            <h2 className={"text-2xl font-bold"}>Accounts</h2>
            <div className={"flex flex-col gap-y-2"}>
                <p className={"text-sm text-gray-400"}>Current accounts</p>
                <div className={"flex flex-wrap md:flex-nowrap gap-6"}>
                    {user?.accounts?.map((account: Account, index: number) => (
                        <div className={"flex flex-col justify-center w-full rounded-3xl bg-zinc-600 p-4 gap-y-4"} key={account.accountNumber ?? index}>
                            <div className={"flex flex-col justify-between"}>
                                <h3 className={"mb-3"}>Base Account</h3>
                                <p className={"text-2xl font-bold"}>{account.balance} {account.currency}</p>
                                <p className={"text-sm text-gray-400"}>{account.accountNumber}</p>
                            </div>
                            <Link to={"."} className={"flex items-center text-green-500 gap-x-1"}>
                                <p className={"font-semibold"}>Details </p>
                                <IoIosArrowForward size={20} className={""} />
                            </Link>
                        </div>
                    ))}
                    {(user?.accounts && user.accounts.length < 2) && (
                        <div className={"flex flex-col justify-center items-center w-full rounded-3xl bg-zinc-600 p-4 gap-y-4"}>
                            {/*<IoIosAddCircleOutline size={64} className={"text-green-500"} />*/}
                            <div className={"text-center space-y-2"}>
                                {/*<h3 className={"text-xl font-bold"}>Open Account</h3>*/}
                                <p>Explore new financial possibilities. Set up your new checking or savings accounts in minutes.</p>
                            </div>
                            <button
                                className={"flex gap-x-1 items-center mt-4 bg-green-500 rounded-3xl text-white py-1 px-4"}
                                onClick={() => createAccountMutation.mutate()}
                            >
                                <IoIosAddCircleOutline size={28} />Open account
                            </button>
                        </div>
                    )}
                </div>
            </div>
            <div className={"flex flex-col gap-y-2"}>
                <p className={"text-sm text-gray-400"}>Credit accounts</p>
                <div className={"flex flex-col gap-y-2"}>
                    <div className={"flex flex-col justify-center items-center w-full rounded-3xl bg-zinc-600 p-4 gap-y-4"}>
                        <GiTakeMyMoney size={64} className={"text-green-500"} />
                        <div className={"text-center space-y-2"}>
                            <h3 className={"text-xl font-bold"}>Finance Your Dreams</h3>
                            <p>Whether it’s home renovation or a big move, we’ve got you covered with low rates.</p>
                        </div>
                        <Link to={"."}  className={"mt-4 bg-green-500 rounded-3xl text-white py-1 px-4"}>View details</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const LoginModern = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Bejelentkezési logika helye
        console.log("Login attempt:", { email, password });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-zinc-950 p-4">
            <div className="w-full max-w-md bg-zinc-900 rounded-3xl shadow-2xl border border-zinc-800 p-8 space-y-8">
                <div className="text-center">
                    <h1 className="text-4xl font-extrabold text-white tracking-tight">Üdvözöljük!</h1>
                    <p className="mt-2 text-zinc-400">Jelentkezzen be fiókjába</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-300 ml-1">E-mail cím</label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-500 group-focus-within:text-green-500 transition-colors">
                                <HiOutlineMail size={20} />
                            </div>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="block w-full pl-11 pr-4 py-3 bg-zinc-800 border border-zinc-700 rounded-2xl text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                                placeholder="pelda@email.hu"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <div className="flex justify-between items-center ml-1">
                            <label className="text-sm font-medium text-zinc-300">Jelszó</label>
                            <Link to="/login" className="text-xs text-green-500 hover:text-green-400 transition-colors">
                                Elfelejtett jelszó?
                            </Link>
                        </div>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-500 group-focus-within:text-green-500 transition-colors">
                                <HiOutlineLockClosed size={20} />
                            </div>
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="block w-full pl-11 pr-12 py-3 bg-zinc-800 border border-zinc-700 rounded-2xl text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                                placeholder="••••••••"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 pr-4 flex items-center text-zinc-500 hover:text-zinc-300 transition-colors"
                            >
                                {showPassword ? <HiOutlineEyeOff size={20} /> : <HiOutlineEye size={20} />}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-green-500 hover:bg-green-600 text-zinc-950 font-bold py-3 px-4 rounded-2xl shadow-lg shadow-green-500/20 transform transition-all active:scale-95"
                    >
                        Bejelentkezés
                    </button>
                </form>

                <div className="text-center pt-4">
                    <p className="text-zinc-400">
                        Még nincs fiókja?{" "}
                        <Link to="/register" className="text-green-500 font-semibold hover:underline">
                            Regisztráljon most
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};