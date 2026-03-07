import { IoHomeOutline } from "react-icons/io5";
import DoughnutChart from "./DoughnutChart.tsx";

export const ExpensesAndTransactions = () => {
    return (
        <div className={"flex flex-col gap-y-6"}>
            <h2 className={"text-2xl font-bold"}>Expenses and transactions</h2>
            <div className={"flex gap-x-10"}>
                <div className={"flex flex-col gap-y-6"}>
                    <div>
                        <h3 className={"text-xl font-bold"}>Monthly expenses</h3>
                        <p className={"text-sm text-gray-400"}>March 1 - March 7</p>
                    </div>
                    <div className={"flex flex-col items-center gap-y-16"}>
                        <div className="relative size-64 rounded-full bg-zinc-600 flex items-center justify-center">
                            {/* Ez az SVG adja ki a 3/4 körívet */}
                            <DoughnutChart />
                        </div>
                        <div className={"w-96 h-80 rounded-3xl bg-zinc-600"}></div>
                    </div>
                </div>
                <div className={"w-full flex flex-col gap-y-6"}>
                    <h3 className={"text-xl font-bold"}>Recent transactions</h3>
                    <div className={"flex flex-col gap-y-2"}>
                        <Transaction beneficiary={"Company 1"} date={"2026. 03. 07."} type={"card operation"} amount={-1500} currency={"HUF"} />
                        <Transaction beneficiary={"Company 2"} date={"2026. 03. 07."} type={"card operation"} amount={-1700} currency={"HUF"} />
                        <Transaction beneficiary={"Company 2"} date={"2026. 03. 07."} type={"card operation"} amount={-9100} currency={"HUF"} />
                        <Transaction beneficiary={"Company 1"} date={"2026. 03. 07."} type={"card operation"} amount={-8700} currency={"HUF"} />
                        <Transaction beneficiary={"Company 3"} date={"2026. 03. 07."} type={"card operation"} amount={-900} currency={"HUF"} />
                        <Transaction beneficiary={"Company 3"} date={"2026. 03. 07."} type={"card operation"} amount={-11549} currency={"HUF"} />
                        <Transaction beneficiary={"Company 5"} date={"2026. 03. 07."} type={"card operation"} amount={-1339} currency={"HUF"} />
                        <Transaction beneficiary={"Company 1"} date={"2026. 03. 07."} type={"card operation"} amount={-106310} currency={"HUF"} />
                        <Transaction beneficiary={"Company 2"} date={"2026. 03. 07."} type={"card operation"} amount={-3000} currency={"HUF"} />
                        <Transaction beneficiary={"Company 4"} date={"2026. 03. 07."} type={"card operation"} amount={-53499} currency={"HUF"} />
                    </div>
                </div>
            </div>
        </div>
    );
};

const Transaction = ({beneficiary, date, type, amount, currency}): {beneficiary: string, date: string, type: string, amount: number, currency: string} => {
    return (
        <div className={"flex w-full rounded-full bg-zinc-600 p-2 gap-x-2"}>
            <div className={"flex items-center justify-center rounded-full bg-green-600 bg-opacity-40 p-2"}>
                <IoHomeOutline size={28} className={"text-green-600"} />
            </div>
            <div className={"w-full flex justify-between items-center"}>
                <div>
                    <p className={"font-bold"}>{beneficiary}</p>
                    <p className={"text-sm text-gray-400"}>{date} - {type}</p>
                </div>
                <p className={"font-semibold pr-2"}>{amount} {currency}</p>
            </div>
        </div>
    )
}