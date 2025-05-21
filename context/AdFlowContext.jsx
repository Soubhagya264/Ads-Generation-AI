"use client";
import React, { createContext, useContext, useState } from "react";

const AdFlowContext = createContext();

export const AdFlowProvider = ({ children }) => {
    const [step, setStep] = useState(0);
    const [selectedScript, setSelectedScript] = useState(null);
    const [uploadedImages, setUploadedImages] = useState([]);
    const [selectedAvatar, setSelectedAvatar] = useState(null);
    const [selectedVoice, setSelectedVoice] = useState(null);
    const [videoId, setVideoId] = useState(null);

    return (
        <AdFlowContext.Provider
            value={{
                step,
                setStep,
                selectedScript,
                setSelectedScript,
                uploadedImages,
                setUploadedImages,
                selectedAvatar,
                setSelectedAvatar,
                selectedVoice,
                setSelectedVoice,
                videoId,
                setVideoId,
            }}
        >
            {children}
        </AdFlowContext.Provider>
    );
};

export const useAdFlow = () => {
    const context = useContext(AdFlowContext);
    if (!context) {
        throw new Error("useAdFlow must be used within AdFlowProvider");
    }
    return context;
};
