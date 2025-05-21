"use client";

import React from "react";
import axios from "axios";
import { UserDetailsContext } from "@/context/UserDetailsContext";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";
import { useAdFlow } from '@/context/AdFlowContext';
import { useState } from "react";
import { useContext } from "react";

const CreateAdModal = ({ isOpen, onClose }) => {
    const { userDetails } = useContext(UserDetailsContext);
    const router = useRouter();
    const [userInput, setUserInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState(null);
    const createVideoData = useMutation(api.videoData.CreateVideoData);
    const { setVideoId } = useAdFlow();
    if (!isOpen) return null;



    const handlescript = async (e) => {
        e.preventDefault();
        setLoading(true);
        // befeore generating a script check if user has more than 2 credits
        if (userDetails.credits < 2) {
            alert("You don't have enough credits to generate a script. Please add more credits to your account.");
            setLoading(false);
            return;
        }
        try {
            const res = await axios.post("/api/generate-script", { userInput });
            console.log(res.data.content);
            const RAWResult = res?.data?.content
                ?.replace(/```json\s*/, '')  // remove ```json and any whitespace/newlines after it
                ?.replace(/```$/, '')        // remove ending ``` if it's at the end
                ?.trim();                    // clean up surrounding whitespace
            const parsedResult = JSON.parse(RAWResult);
            console.log(userDetails, "userDetails")
            const resp = await createVideoData({
                uId: userDetails._id,
                topic: userInput,
                scriptVariant: parsedResult
            })
            console.log(resp, "response")
            const videoId = resp;
            //set this to local storage
            localStorage.setItem("videoId", videoId);
            setVideoId(videoId);
            setResponse(resp);
            // Redirect user to ad-created
            router.push(`/workspace/ad-created/${videoId}`); // Adjust the path as needed
            onClose();
        } catch (error) {
            console.error("Error generating ad:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
            <div className="relative w-full max-w-lg rounded-xl p-[2px] bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 animate-borderGlow">
                <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-2xl text-gray-900 dark:text-white">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold">✨ Create Your AI Ad</h2>
                        <button
                            onClick={onClose}
                            className="text-gray-400 cursor-pointer hover:text-red-500 text-2xl leading-none"
                        >
                            &times;
                        </button>
                    </div>

                    <form onSubmit={handlescript} className="space-y-4">
                        <div>
                            <label className="block text-sm mb-1">Ad Title</label>
                            <input
                                type="text"
                                placeholder="Enter title"
                                value={userInput}
                                onChange={(e) => setUserInput(e.target.value)}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800"
                                disabled={loading}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading || !userInput.trim()}
                            className={`w-full flex justify-center items-center bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'
                                }`}
                        >
                            {loading ? (
                                <div className="flex items-center gap-2">
                                    <span className="loader ease-linear rounded-full border-4 border-t-4 border-white border-t-transparent w-5 h-5 animate-spin" />
                                    Generating...
                                </div>
                            ) : (
                                <>🚀 Generate Ad</>
                            )}
                        </button>
                    </form>

                    {response && (
                        <div className="mt-4 p-4 bg-green-100 text-green-700 rounded-lg text-sm">
                            ✅ <strong>Response:</strong> {response.generatedAd || JSON.stringify(response)}
                        </div>
                    )}
                </div>
            </div>

            <style jsx>{`
        @keyframes borderGlow {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .animate-borderGlow {
          background-size: 200% 200%;
          animation: borderGlow 4s ease infinite;
        }
      `}</style>
        </div>
    );
};

export default CreateAdModal;
