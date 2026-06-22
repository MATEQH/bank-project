import { IoHomeOutline } from "react-icons/io5";

interface TransactionProps {
    beneficiary: string;
    date: string;
    type: string;
    amount: number;
    currency: string;
}

export const Transaction = ({ beneficiary, date, type, amount, currency }: TransactionProps) => {
    return (
        <div className="flex w-full rounded-full bg-zinc-600 p-2 gap-x-2">
            <div className="flex items-center justify-center rounded-full bg-green-600 bg-opacity-40 p-2">
                <IoHomeOutline size={28} className="text-green-600" />
            </div>
            <div className="w-full flex justify-between items-center">
                <div>
                    <p className="font-bold">{beneficiary}</p>
                    <p className="text-sm text-gray-400">{date} - {type}</p>
                </div>
                <p className="font-semibold pr-2">{amount} {currency}</p>
            </div>
        </div>
    );
};