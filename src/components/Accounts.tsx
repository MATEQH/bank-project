import { useAuth } from "../auth/use-auth.ts";
import { IoIosAddCircleOutline, IoIosArrowForward } from "react-icons/io";
import { Link } from "@tanstack/react-router";
import { GiTakeMyMoney } from "react-icons/gi";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import type {AxiosError} from "axios";
import {toast} from "react-toastify";
import {createAccount} from "../auth/auth-api.ts";

export const Accounts = () => {
    const queryClient = useQueryClient();
    const { user } = useAuth();

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
                    {user?.accounts?.map((account, index) => (
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
                    {/*{user?.accounts?.map((account, index) => (*/}
                    {/*    <div className={"flex flex-col justify-center w-full rounded-3xl bg-zinc-600 p-4 gap-y-4"} key={account.accountNumber ?? index}>*/}
                    {/*        <div className={"flex flex-col justify-between"}>*/}
                    {/*            <h3 className={"mb-3"}>Base Account</h3>*/}
                    {/*            <p className={"text-2xl font-bold"}>{account.balance} {account.currency}</p>*/}
                    {/*            <p className={"text-sm text-gray-400"}>{account.accountNumber}</p>*/}
                    {/*        </div>*/}
                    {/*        <Link to={"."} className={"flex items-center text-green-500 gap-x-1"}>*/}
                    {/*            <p className={"font-semibold"}>Details </p>*/}
                    {/*            <IoIosArrowForward size={20} className={""} />*/}
                    {/*        </Link>*/}
                    {/*    </div>*/}
                    {/*))}*/}
                    {/*{user?.accounts?.map((account, index) => (*/}
                    {/*    <div className={"flex flex-col justify-center w-full rounded-3xl bg-zinc-600 p-4 gap-y-4"} key={account.accountNumber ?? index}>*/}
                    {/*        <div className={"flex flex-col justify-between"}>*/}
                    {/*            <h3 className={"mb-3"}>Base Account</h3>*/}
                    {/*            <p className={"text-2xl font-bold"}>{account.balance} {account.currency}</p>*/}
                    {/*            <p className={"text-sm text-gray-400"}>{account.accountNumber}</p>*/}
                    {/*        </div>*/}
                    {/*        <Link to={"."} className={"flex items-center text-green-500 gap-x-1"}>*/}
                    {/*            <p className={"font-semibold"}>Details </p>*/}
                    {/*            <IoIosArrowForward size={20} className={""} />*/}
                    {/*        </Link>*/}
                    {/*    </div>*/}
                    {/*))}*/}
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