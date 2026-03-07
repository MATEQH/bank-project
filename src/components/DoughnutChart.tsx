import React from "react";

const DoughnutChart = () => {
    const name: string = "A";
    const percentage: number = 100;
    const color: string = "text-green-600";
    const dashOffset = 0;
    const dashArray = `${percentage} 100`;

    return (
        <div className="relative size-64 flex items-center justify-center">
            <svg className="absolute w-full h-full rotate-90" viewBox="0 0 36 36">

                <circle
                    cx="18"
                    cy="18"
                    r="15.915"
                    fill="none"
                    className={color}
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeDasharray={dashArray}
                    strokeDashoffset={dashOffset}
                    style={{ transition: "stroke-dashoffset 0.5s ease" }}
                />
                );
            </svg>
            {/* Középső címke */}
            <div className="absolute text-center">
                <div className="text-3xl font-bold">197 597 HUF</div>
                <div className="text-sm">Összesen</div>
            </div>
        </div>
    );
};

export default DoughnutChart;