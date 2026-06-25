import { closeAccount } from "../auth/auth-api.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { toast } from "react-toastify";
import { Navbar } from "../components/Navbar.tsx";
import { Accounts } from "../components/Accounts.tsx";
import { RecommendForYou } from "../components/RecommendForYou.tsx";
import { ExpensesAndTransactions } from "../components/ExpensesAndTransactions.tsx";

export const Index = () => {
    const queryClient = useQueryClient();
    useMutation({
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
        <div className={"w-full min-h-dvh flex flex-col text-white gap-y-10 px-2 sm:px-8 md:px-16 lg:px-24 xl:px-48 pt-4 pb-8"}>
            <Navbar />
            <Accounts />
            <RecommendForYou />
            <ExpensesAndTransactions />
        </div>
    );
};

export default Index;