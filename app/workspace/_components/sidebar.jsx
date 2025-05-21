"use client";
import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebarUi";
import {
    IconArrowLeft,
    IconBrandTabler,
    IconVideo,
    IconUserBolt,
    IconPlus,
    IconCash,
} from "@tabler/icons-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { UserDetailsContext } from "@/context/UserDetailsContext";
import { useUser } from "@clerk/nextjs";
import CreateAdModal from "../CreateAdModal"
;




export function AppSidebar({ children }) {
    const pathname = usePathname();
    
    const router = useRouter();
    const [open, setOpen] = useState(true);
    const [showModal, setShowModal] = useState(false); // State to track the modal's open/close status
    const { userDetails } = React.useContext(UserDetailsContext);

    const links = [
        { label: "Dashboard", href: "/workspace/dashboard", icon: <IconBrandTabler className="h-5 w-5" /> },
        { label: "Profile", href: "/workspace/profile", icon: <IconUserBolt className="h-5 w-5" /> },
        { label: "My Videos", href: "/workspace/my-videos", icon: <IconVideo className="h-5 w-5" /> },
        { label: "Billing", href: "/workspace/billing", icon: <IconCash className="h-5 w-5" /> },
        { label: "Logout", href: "/logout", icon: <IconArrowLeft className="h-5 w-5" /> },
    ];

    return (
        <div
            className={cn(
                "mx-auto flex w-full mt-1 h-fit flex-1 flex-col overflow-hidden rounded-md border border-neutral-200 bg-gray-100 md:flex-row dark:border-neutral-700 dark:bg-neutral-800",
                "max-h-max"
            )}
        >
            <Sidebar open={open} setOpen={setOpen}>
                <SidebarBody className="justify-between gap-10">
                    <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
                        {open ? <Logo /> : <LogoIcon />}
                        <div className="mt-8 flex flex-col gap-2">
                            <button
                                onClick={() => setShowModal(true)}
                                className="flex items-center gap-2 rounded-lg px-1 py-2 text-sm font-medium cursor-pointer text-neutral-700 hover:bg-neutral-200 dark:text-neutral-200 dark:hover:bg-neutral-700"
                            >
                                <IconPlus className="h-5 w-5 shrink-0" />
                                <span>Create Ads</span>
                            </button>
                            <CreateAdModal isOpen={showModal} onClose={() => setShowModal(false)} />
                            <div className="mt-4 h-0.5 w-full bg-neutral-200 dark:bg-neutral-700" />

                            {links.map((link, idx) => (
                                <SidebarLink key={idx} link={link} active={pathname === link.href} onClick={() => router.push(link.href)} />
                            ))}
                        </div>
                    </div>
                    <div>
                        <SidebarLink
                            link={{
                                label: "User",
                                href: "/workspace/profile",
                                icon: (
                                    <img
                                        src={userDetails?.picture}
                                        className="h-7 w-7 shrink-0 rounded-full"
                                        width={50}
                                        height={50}
                                        alt="Avatar"
                                    />
                                ),
                            }}
                        />
                    </div>
                </SidebarBody>
            </Sidebar>
            <div className="flex flex-1 flex-col gap-2 rounded-tl-2xl border border-neutral-200 bg-white p-2 md:p-10 dark:border-neutral-700 dark:bg-neutral-900">
                {children}
            </div>
        </div>
    );
}

export const Logo = () => (
    <a
        href="/"
        className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
    >
        <div className="size-7 rounded-full bg-gradient-to-br from-violet-500 to-pink-500" />
        <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1.5 }}
            className="font-medium whitespace-pre text-black dark:text-white"
        >
            PromoPilot
        </motion.span>
    </a>
);

export const LogoIcon = () => (
    <a
        href="/"
        className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
    >
        <div className="size-7 rounded-full bg-gradient-to-br from-violet-500 to-pink-500" />
    </a>
);
