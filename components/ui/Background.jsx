"use client";

import { AuroraText } from "@/components/magicui/aurora-text";
import { motion } from "framer-motion";
import { HeroScroll } from "./hero-scroll";
import { WobbleCards } from "./WobbleCards";
import { TextAnimate } from "../magicui/text-animate";
import { TextGenerateEffect } from "./text-generated-effect";
import { Testimonials } from "./Testimonials";
import { HoverBorderGradient } from "./hover-border-gradient";
import Footer from "./footer";
import DemoVideos from "./ShowDemoVideo";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { useSignIn } from "@clerk/nextjs";


export function HeroSectionOne() {
    const router = useRouter();
    

    return (
        <div
            className="relative  my-3 flex max-w-7xl flex-col items-center justify-center">
            <Navbar />
            <div
                className="absolute inset-y-0 left-0 h-full w-px bg-neutral-200/80 dark:bg-neutral-800/80">
                <div
                    className="absolute top-0 h-40 w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent" />
            </div>
            <div
                className="absolute inset-y-0 right-0 h-full w-px bg-neutral-200/80 dark:bg-neutral-800/80">
                <div
                    className="absolute h-40 w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent" />
            </div>
            <div
                className="absolute inset-x-0 bottom-0 h-px w-full bg-neutral-200/80 dark:bg-neutral-800/80">
                <div
                    className="absolute mx-auto h-px w-40 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
            </div>
            <div className="px-4 py-10 md:py-20">
                <AuroraText className="relative z-10 text-center mx-auto max-w-6xl  text-7xl font-bold">
                    PromoPilot
                </AuroraText>
                <TextGenerateEffect className="relative z-10 mx-auto max-w-xl py-4 text-center text-lg font-normal text-neutral-500 dark:text-neutral-300"
                    words={`With AI, you can Generate your Ads for your product in mins, not hours. Try our best
                    in class, state of the art, cutting edge AI tools to get your talking avatar for advertisement`}></TextGenerateEffect>

                <motion.div
                    initial={{
                        opacity: 0,
                    }}
                    animate={{
                        opacity: 1,
                    }}
                    transition={{
                        duration: 0.3,
                        delay: 1,
                    }}
                    className="relative z-10 mt-8 flex flex-wrap items-center justify-center gap-4">

                    <HoverBorderGradient
                        containerClassName="rounded-full"
                        as="button"
                        className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-3"
                        onClick={() => { router.push("/workspace/dashboard") }}
                    >
                        Explore Now
                    </HoverBorderGradient>

                </motion.div>
                <HeroScroll />
            </div>
            <div className=" mt-[-210px]">
                <TextAnimate animation="scaleUp" by="text">
                    <span className="dark:text-neutral-300 text-3xl font-bold mb-56 ">Ultimate Features</span>
                </TextAnimate>
                <WobbleCards />
            </div>
            <DemoVideos />
            <div>
                <TextAnimate animation="slideUp" by="text">
                    <span className="dark:text-neutral-300 text-3xl font-bold mb-56 ">Testimonials</span>
                </TextAnimate>
                <Testimonials />
            </div>
            <Footer />
        </div>

    );
}

const Navbar = () => {
    const { user } = useUser();
    const { openSignIn } = useSignIn();
    const handleLogin = () => {
        openSignIn();
    };
    return (
        <nav
            className="flex w-full items-center justify-between border-t border-b border-neutral-200 px-4 py-4 dark:border-neutral-800">
            <div className="flex items-center gap-2">
                <div
                    className="size-7 rounded-full bg-gradient-to-br from-violet-500 to-pink-500" />
                <h1 className="text-base font-bold md:text-2xl">PromoPilot</h1>
            </div>
            {/* if user do not show */}

            {!user && <button
                className="w-24 transform rounded-lg bg-black px-6 py-2 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-800 md:w-32 dark:bg-white dark:text-black dark:hover:bg-gray-200"
                onClick={
                    () => {
                        handleLogin();
                    }
                }

            >
                Login
            </button>}
        </nav>
    );
};
