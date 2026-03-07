import { Link } from "@tanstack/react-router";
import { IoIosArrowDown } from "react-icons/io";

export const RecommendForYou = () => {
    return (
        <div className={"flex flex-col gap-y-4"}>
            <div className={"flex flex-col rounded-3xl shadow-2xl shadow-zinc-800 p-5 gap-y-4"}>
                <h2 className={"text-2xl font-bold"}>We recommend for you</h2>

                <div className={"flex flex-col gap-y-2"}>
                    <div className={"flex flex-col gap-y-2"}>
                        <div className={"flex flex-col justify-center w-full rounded-3xl bg-zinc-600 p-4 gap-y-4"}>
                            <div className={"space-y-2"}>
                                <h3 className={"text-xl font-bold"}>Individual personal loan option</h3>
                                <p className={"text-sm"}>You can get 7,011,011 HUF extra money completely online if you
                                    replace your existing personal loan. APR: 16.6%</p>
                            </div>
                            <div className={"flex gap-x-4"}>
                                <Link to={"."} className={"w-fit mt-4 bg-green-500 rounded-3xl text-white py-1 px-4"}>I'm
                                    interested in the details</Link>
                                <Link to={"."}
                                      className={"border border-green-500 w-fit mt-4 rounded-3xl text-green-500 py-1 px-4"}>I
                                    don't care</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={"flex gap-x-2 justify-center items-center"}>
                <p className={"text-green-500 text-center"}>More</p>
                <IoIosArrowDown className={"text-green-500"} />
            </div>
        </div>
    );
};