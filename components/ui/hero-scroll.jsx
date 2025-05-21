"use client";
import React from "react";
import { ContainerScroll } from "../ui/container-scroll-animation";

export function HeroScroll() {
    return (
        <div className="flex flex-col overflow-hidden mt-[-220px]">
            <ContainerScroll
               >
                {/* i have image inside public folder ads-prod.png  */}
                <img
                    src={`/ads-prod.png`}
                    alt="hero"
                    height={720}
                    width={1400}
                    className="mx-auto rounded-2xl object-cover h-full object-left-top"
                    draggable={false} />
            </ContainerScroll>
        </div>
    );
}
