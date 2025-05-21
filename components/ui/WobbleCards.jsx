"use client";

import React from "react";
import { WobbleCard } from "./woble-cards";

export function WobbleCards() {
    return (
        <div
            className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-6xl mb-10 mx-auto w-full mt-5">
            <WobbleCard containerClassName="col-span-1 lg:col-span-2 h-full bg-violet-800 min-h-[300px] lg:min-h-[300px]">
                <div className="max-w-xs">
                    <h2 className="text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                        Instant Scripts, Just Type & Go
                    </h2>
                    <p className="mt-4 text-left text-base/6 text-neutral-200">
                        Drop your product idea or prompt—our AI turns it into a powerful ad script, tailored and ready to roll.
                    </p>
                </div>
            </WobbleCard>
            <WobbleCard containerClassName="col-span-1 bg-pink-900 min-h-[300px]">
                <div className="max-w-xs">
                    <h2 className="text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                        Choose Your Star Cast
                    </h2>
                    <p className="mt-4 text-left text-base/6 text-neutral-200">
                        Pick from diverse avatars and voices to match your brand vibe and connect with your audience.
                    </p>
                </div>
            </WobbleCard>

            <WobbleCard containerClassName="col-span-1 lg:col-span-3 bg-sky-700 min-h-[300px] lg:min-h-[300px] xl:min-h-[300px]">
                <div className="max-w-sm">
                    <h2 className="text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                        Generate Ad Videos. Automatically.
                    </h2>
                    <p className="mt-4 text-left text-base/6 text-neutral-200">
                        Add your product URL, click a button, and boom—your polished video ad is ready to share in minutes.
                    </p>
                </div>
                <img
                    src="/video-demo.webp"
                    width={500}
                    height={500}
                    alt="video demo"
                    className="absolute -right-10 lg:-right-[20%] -bottom-10 object-contain rounded-2xl"
                />
            </WobbleCard>
        </div>
    );
}
