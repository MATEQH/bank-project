import { FaMoneyBillTransfer } from "react-icons/fa6";
import { FaHistory, FaRegCreditCard } from "react-icons/fa";
import { PiInvoice } from "react-icons/pi";
import { useAuth } from "../auth/use-auth.ts";
import { IoIosArrowDown } from "react-icons/io";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";

export const Navbar = () => {
    const { user } = useAuth();
    const [isMenuOpened, setMenuOpened] = useState<boolean>(false);

    return (
        <nav className={"z-30 w-full flex justify-between items-center rounded-3xl bg-zinc-700 shadow-2xl shadow-zinc-900 py-4 px-6"}>
            <GiHamburgerMenu size={24} className={"flex lg:hidden"} onClick={() => setMenuOpened(prev => !prev)} />
            <div className={`hidden lg:flex items-center gap-x-5`}>
                <Link to={"."} className={`flex items-center gap-x-2`}>
                    <FaMoneyBillTransfer size={24} className={"text-green-500"} />
                    <span className={"text-lg font-semibold"}>Transfer</span>
                </Link>
                <Link to={"."} className={"flex items-center gap-x-2"}>
                    <FaHistory size={24} className={"text-green-500"} />
                    <span className={"text-lg font-semibold"}>Account history</span>
                </Link>
                <Link to={"."} className={"flex items-center gap-x-2"}>
                    <PiInvoice size={24} className={"text-green-500"} />
                    <span className={"text-lg font-semibold"}>Accounts</span>
                </Link>
                <Link to={"."} className={"flex items-center gap-x-2"}>
                    <FaRegCreditCard size={24} className={"text-green-500"} />
                    <span className={"text-lg font-semibold"}>Cards</span>
                </Link>
            </div>
            <div className={"flex items-center gap-x-2 cursor-pointer"}>
                <p>Logged as, <span className={"font-semibold"}>{user?.firstName} {user?.lastName}</span></p>
                <IoIosArrowDown />
            </div>
        </nav>
    );
};