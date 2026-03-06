import { useNavigate } from "@tanstack/react-router";
import { useAuth } from "../auth/use-auth.ts";
import { closeAccount, createAccount } from "../auth/auth-api.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { toast } from "react-toastify";

export const Index = () => {
    const {user, logout} = useAuth();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const handleLogout = async () => {
        logout();
        await navigate({to: "/auth/login"});
    }

    const createMutation = useMutation({
        mutationFn: async () => await createAccount(),
        onError: async (error: AxiosError<{message: string}>) => {
            toast.error(error.response?.data?.message || "An error occurred");
        },
        onSuccess: async (data) => {
            await queryClient.invalidateQueries({queryKey: ["me"]});
            toast.success(data?.message);
        }
    });

    const closeMutation = useMutation({
        mutationFn: async (accountNumber: string) => await closeAccount(accountNumber),
        onError: async (error: AxiosError<{message: string}>) => {
            toast.error(error.response?.data?.message || "An error occurred");
        },
        onSuccess: async (data) => {
            await queryClient.invalidateQueries({queryKey: ["me"]});
            toast.success(data?.message);
        }
    });

    return (
        <div className={"w-full min-h-dvh flex flex-col text-white gap-y-4"}>
            <div className={"flex justify-between text-lg bg-green-500 p-2"}>
                <h2>Dashboard</h2>
                {/*<pre>{JSON.stringify(user, null, 2)}</pre>*/}
                <div className={"flex items-center gap-x-2"}>
                    <p className={"text-xs"}>Welcome, {user?.firstName} {user?.lastName}!</p>
                    <button className={"border border-white rounded-2xl py-1 px-2 text-sm"} onClick={handleLogout}>Logout</button>
                </div>
            </div>
            {/*<p>{user?.accounts}</p>*/}
            <div className={"flex flex-col gap-y-4 rounded-xl p-4 bg-green-500 mx-2 w-full max-w-4xl"}>
                <div className={"flex items-center justify-between"}>
                    <div>
                        <h3 className={"text-2xl font-semibold"}>Accounts</h3>
                        <p className={"text-xs"}>At here you can see your accounts.</p>
                    </div>
                    <div>
                        <button
                            className={"border rounded-xl py-1 px-2 text-sm hover:scale-105"}
                            onClick={() => {
                                createMutation.mutate();
                            }}
                        >Create +</button>
                    </div>
                </div>
                <div className={"flex flex-wrap gap-6"}>
                    {user?.accounts?.map((account, index) => (
                        <div className={"flex flex-col justify-center w-full max-w-sm border rounded-3xl bg-green-500 p-4 gap-y-4"} key={account.accountNumber ?? index}>
                            <div className={"flex justify-between items-center"}>
                                <div className={"flex items-center gap-x-2"}>
                                    <h4 className={"font-semibold text-lg"}>Base account</h4>
                                    <p className={"text-xs"}>(ACTIVE)</p>
                                </div>
                                <div className={"flex gap-x-1"}>
                                    <p className={"font-semibold"}>Balance:</p>
                                    <p className={""}>{account.currency} {account.balance}</p>
                                </div>
                            </div>
                            <div>
                                <p className={"font-semibold"}>Account number:</p>
                                <p className={"text-sm"}>{account.accountNumber}</p>
                            </div>
                            <div className={"flex justify-between gap-x-2 items-center"}>
                                <button className={"w-fit text-xs border border-white rounded-md py-1 px-2 bg-orange-500"}>Transfer</button>
                                <div className={"flex gap-x-2 items-center"}>
                                    <button className={"w-fit text-xs border border-white rounded-md py-1 px-2 bg-sky-400"}>Freeze</button>
                                    <button
                                        className={"w-fit text-xs border border-white rounded-md py-1 px-2 bg-red-500"}
                                        onClick={() => {
                                            closeMutation.mutate(account.accountNumber);
                                        }}
                                    >Close</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Index;