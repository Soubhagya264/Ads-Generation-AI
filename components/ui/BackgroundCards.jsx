'use client';

import React from "react";

const DashboardCard = ({ title, description }) => {
    return (
        <div className="relative group w-64 h-36 rounded-xl p-[2px] bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 animate-border shadow-xl">
            <div className="flex flex-col justify-between h-full w-full bg-black text-white rounded-xl p-4">
                <h3 className="text-lg font-semibold">{title}</h3>
                <p className="text-shadow-2xs opacity-70">{description}</p>
            </div>
        </div>
    );
};

export default DashboardCard;
