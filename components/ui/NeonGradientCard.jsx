"use client";
import { NeonGradientCard } from "../magicui/neon-gradient-card";
import React from "react";

export function NeonGradientCards({ index, content, selectedIndex, setSelectedIndex }) {
    const isSelected = selectedIndex === index;

    return (
        <div onClick={() => setSelectedIndex(index)} className="w-full max-w-sm">
            <NeonGradientCard
                className={`cursor-pointer items-center justify-center text-center ${isSelected && "border-2 border-green-500" 
                    }`}
                neonColors={{
                    firstColor: "white",
                    secondColor: "gray",
                }}
                selected={isSelected}
            >
                <span className="pointer-events-none z-10 h-full whitespace-pre-wrap bg-gradient-to-br from-[#caff29] from-35% to-[#0037ff] bg-clip-text text-center text-1xl font-bold leading-none tracking-tighter text-transparent dark:drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)]">
                    {content}
                </span>
            </NeonGradientCard>
        </div>
    );
}
