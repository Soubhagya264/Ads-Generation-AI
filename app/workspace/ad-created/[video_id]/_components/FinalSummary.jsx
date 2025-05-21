"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAdFlow } from "@/context/AdFlowContext";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function FinalSummary() {
    const {
        selectedScript,
        uploadedImages,
        selectedAvatar,
        selectedVoice,
        setStep,
    } = useAdFlow();

    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const { user } = useUser();
    const router = useRouter();

    const handleGenerateVideo = async () => {
        if (!selectedScript || !selectedAvatar || !selectedVoice || uploadedImages.length === 0) {
            alert("Missing required data.");
            return;
        }

        const backgroundImageUrl = uploadedImages[0]; // First image

        const options = {
            method: 'POST',
            url: 'https://api.heygen.com/v2/video/generate',
            headers: {
                'accept': 'application/json',
                'content-type': 'application/json',
                'x-api-key': "YTBlNjg4YzhlZDk4NGEyMDk3OTAxNzlmMDRiYWFjYTctMTc0Njk1NDY3MA==",
            },
            data: {
                caption: false,
                title: "Ad Video",
                dimension: {
                    width: 1280,
                    height: 720,
                },
                video_inputs: [
                    {
                        character: {
                            type: "avatar",
                            avatar_id: selectedAvatar.avatar_id,
                            avatar_style: "normal",
                        },
                        voice: {
                            type: "text",
                            voice_id: selectedVoice.voice_id,
                            input_text: selectedScript,
                        },
                        background: {
                            type: "image",
                            url: backgroundImageUrl,
                        },
                    },
                ],
            },
        };

        setLoading(true);
        setError(null);

        try {
            const res = await axios.request(options);
            const videoId = res.data?.data?.video_id;

            if (videoId) {
                router.push(`/workspace/show-video?video_id=${videoId}`);

            } else {
                setError("Video ID not received.");
            }
        } catch (err) {
            console.error("Error:", err);
            setError("Failed to start video generation.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black px-6 py-10 text-white">
            <div className="max-w-4xl mx-auto space-y-8">
                <h2 className="text-4xl font-bold text-center mb-6">🎬 Final Summary</h2>

                {/* Script */}
                <div className="backdrop-blur-sm bg-white/10 border border-purple-500/50 rounded-xl p-6">
                    <h3 className="text-xl font-semibold mb-3">📝 Selected Script</h3>
                    <p className="text-sm whitespace-pre-line text-gray-100">{selectedScript}</p>
                </div>

                {/* Uploaded Images */}
                <div className="backdrop-blur-sm bg-white/10 border border-blue-500/40 rounded-xl p-6">
                    <h3 className="text-xl font-semibold mb-4">🖼 Uploaded Images</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {uploadedImages.map((img, index) => {
                            return (
                                <div key={index} className="bg-black/30 border border-blue-400 rounded-lg p-2 flex flex-col items-center">
                                    <img
                                        src={img}
                                        alt={`Uploaded preview ${index + 1}`}
                                        className="w-24 h-24 object-cover rounded-md border border-white"
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Avatar + Voice */}
                <div className="backdrop-blur-sm bg-white/10 border border-pink-500/40 rounded-xl p-6 space-y-4">
                    <h3 className="text-xl font-semibold">🧑 Selected Avatar & Voice</h3>
                    <div className="flex items-center gap-4">
                        {selectedAvatar?.preview_image_url && (
                            <img
                                src={selectedAvatar.preview_image_url}
                                alt="Avatar"
                                className="w-20 h-20 rounded-full object-cover border-4 border-pink-500"
                            />
                        )}
                        {selectedVoice && (
                            <div className="text-left">
                                <p className="text-md text-gray-300">🎤 Voice Name:</p>
                                <p className="text-sm text-white">{selectedVoice.name}</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Navigation + Generate Button */}
                <div className="flex justify-between pt-6">
                    <button
                        onClick={() => setStep((prev) => prev - 1)}
                        className="px-6 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-white"
                    >
                        ⬅ Prev
                    </button>

                    <button
                        onClick={handleGenerateVideo}
                        disabled={loading}
                        className="px-6 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white font-semibold"
                    >
                        {loading ? "Generating..." : "🚀 Generate Video"}
                    </button>
                </div>

                {response && (
                    <div className="mt-6 p-4 bg-green-700 rounded text-white">
                        ✅ Video generation started. Video ID: <strong>{response.video_id}</strong>
                    </div>
                )}
                {error && (
                    <div className="mt-6 p-4 bg-red-700 rounded text-white">
                        ❌ {error}
                    </div>
                )}
            </div>
        </div>
    );
}
