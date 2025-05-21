"use client";
import React from "react";
import { AdFlowProvider, useAdFlow } from "@/context/AdFlowContext";
import UploadImage from "./_components/UploadFiles";
import UploadAvatar from "./_components/UploadAvatar";
import FinalSummary from "./_components/FinalSummary";
import SelectScript from "./_components/SelectScript";
import { motion, AnimatePresence } from "framer-motion";

const StepManager = ({ video_id }) => {
    const { step, setStep } = useAdFlow();

    const steps = [
        <SelectScript key="script" video_id={video_id} />,
        <UploadImage key="upload" />,
        <UploadAvatar key="avatar" />,
        <FinalSummary key="summary" />,
    ];

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={step}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.3 }}
            >
                {steps[step]}
            </motion.div>
        </AnimatePresence>
    );
};

export default function AdCreatedPage({ params }) {
    const { video_id } = React.use(params);
    return (
        <AdFlowProvider>
            <div className="min-h-screen p-4">
                <StepManager video_id={video_id} />
            </div>
        </AdFlowProvider>
    );
}
