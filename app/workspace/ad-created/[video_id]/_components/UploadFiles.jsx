"use client";
import React, { useState } from "react";
import { useAdFlow } from "@/context/AdFlowContext";
import { Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const UploadImage = () => {
    const { uploadedImages, setUploadedImages, setStep } = useAdFlow();
    const [imageUrl, setImageUrl] = useState("");

    const handleUrlAdd = () => {
        if (!imageUrl || !imageUrl.startsWith("http")) {
            alert("Please enter a valid image URL.");
            return;
        }
        setUploadedImages([...uploadedImages, imageUrl]);
        setImageUrl("");
    };

    const handleDelete = (index) => {
        const updated = uploadedImages.filter((_, i) => i !== index);
        setUploadedImages(updated);
    };

    return (
        <div className="max-w-4xl mx-auto px-6 py-10 bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl shadow-lg border border-blue-600/20">
            <h2 className="text-3xl font-bold text-white mb-6">Paste Image URLs</h2>

            <div className="flex flex-col sm:flex-row gap-4 items-center mb-8">
                <input
                    type="text"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="Enter image URL (https://...)"
                    className="px-4 py-2 rounded-md bg-white/10 border border-blue-400 text-white w-full sm:w-96 placeholder:text-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    onClick={handleUrlAdd}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow"
                >
                    ➕ Add
                </button>
            </div>

            {/* Preview Grid */}
            {uploadedImages.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-10">
                    <AnimatePresence>
                        {uploadedImages.map((url, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ duration: 0.3 }}
                                className="relative bg-white/10 border border-blue-400 rounded-lg overflow-hidden shadow-md"
                            >
                                <img
                                    src={url}
                                    alt={`preview-${idx}`}
                                    className="w-full h-40 object-cover"
                                />
                                <button
                                    onClick={() => handleDelete(idx)}
                                    className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white p-1 rounded-full"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between">
                <button
                    onClick={() => setStep((prev) => prev - 1)}
                    className="px-4 py-2 rounded-md bg-gray-600 hover:bg-gray-700 text-white"
                >
                    ⬅ Prev
                </button>
                <button
                    onClick={() => setStep((prev) => prev + 1)}
                    disabled={uploadedImages.length === 0}
                    className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50"
                >
                    Next ➡
                </button>
            </div>
        </div>
    );
};

export default UploadImage;
