"use client";
import React, { useEffect, useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useAdFlow } from "@/context/AdFlowContext";
import { NeonGradientCards } from "@/components/ui/NeonGradientCard";
import { motion } from "framer-motion";

export default function SelectScript({ video_id }) {
    const { setStep, setSelectedScript } = useAdFlow();
    const getVideoData = useMutation(api.videoData.GetVideoData);

    const [videoData, setVideoData] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [topic, setTopic] = useState("");
    const [script, setScript] = useState("");

    useEffect(() => {
        const fetchVideoData = async () => {
            const data = await getVideoData({ vid: video_id });
            setVideoData(data);
            if (data?.topic) setTopic(data.topic);
            if (data?.scriptVariant?.[0]?.content) setScript(data.scriptVariant[0].content);
        };
        fetchVideoData();
    }, [video_id, getVideoData]);

    useEffect(() => {
        if (videoData?.scriptVariant?.[selectedIndex]) {
            setScript(videoData.scriptVariant[selectedIndex].content);
        }
    }, [selectedIndex, videoData]);

    const handleNext = () => {
        setSelectedScript(script);
        setStep((prev) => prev + 1);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0f0f1c] via-[#111221] to-[#0e0c24] px-6 py-12 flex items-center justify-center">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="w-full max-w-6xl"
            >
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center">
                    🎉 Ads Script Successfully Created!
                </h1>

                {videoData && (
                    <>
                        <div className="bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl rounded-2xl p-6 md:p-8 space-y-6 text-white">
                            <div>
                                <label className="block text-sm font-semibold text-gray-300 mb-1">Topic</label>
                                <input
                                    type="text"
                                    value={topic}
                                    disabled
                                    className="w-full px-4 py-2 rounded-md border border-gray-700 bg-white/10 text-white placeholder:text-white/40 cursor-not-allowed"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-300 mb-1">Selected Video Script</label>
                                <textarea
                                    value={script}
                                    onChange={(e) => setScript(e.target.value)}
                                    rows={6}
                                    className="w-full px-4 py-2 rounded-md border border-gray-700 bg-white/10 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-green-500"
                                />
                            </div>
                        </div>

                        <div className="mt-10 text-center">
                            <h2 className="text-2xl font-bold text-white">Generated Scripts</h2>
                            <p className="text-gray-400 text-sm">Select a script to generate its video content.</p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                            {videoData.scriptVariant.map((scriptObj, index) => (
                                <NeonGradientCards
                                    key={index}
                                    index={index}
                                    content={scriptObj.content}
                                    selectedIndex={selectedIndex}
                                    setSelectedIndex={setSelectedIndex}
                                />
                            ))}
                        </div>

                        <div className="flex justify-end mt-10">
                            <button
                                onClick={handleNext}
                                className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-lg transition shadow-lg"
                            >
                                Next ➡
                            </button>
                        </div>
                    </>
                )}
            </motion.div>
        </div>
    );
}
