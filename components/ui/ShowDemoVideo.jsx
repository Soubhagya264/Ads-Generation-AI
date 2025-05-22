"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const videos = [
    { src: "/demo1.mp4", title: "AI-Powered Ad Builder" },
    { src: "/demo2.mp4", title: "Smart Script Generator" },
    { src: "/demo3.mp4", title: "Seamless Publishing" },
];

const LazyVideoCard = ({ src, index }) => {
    const videoRef = useRef(null);
    const containerRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    if (videoRef.current) {
                        videoRef.current.play();
                    }
                } else {
                    if (videoRef.current) {
                        videoRef.current.pause();
                    }
                }
            },
            { threshold: 0.4 }
        );

        if (containerRef.current) observer.observe(containerRef.current);
        return () => {
            if (containerRef.current) observer.unobserve(containerRef.current);
        };
    }, []);

    const handleCanPlay = () => {
        setIsLoading(false);
    };

    return (
        <motion.div
            ref={containerRef}
            className="relative p-[2px] rounded-3xl bg-gradient-to-r from-pink-500 via-blue-500 to-purple-500 shadow-lg"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.2 }}
            viewport={{ once: true }}
        >
            <div className="relative bg-white/10 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-md border border-white/20 group hover:scale-105 transition-transform duration-300">
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent z-10"></div>

                {isVisible && (
                    <>
                        <video
                            ref={videoRef}
                            className="w-full h-64 object-cover rounded-t-3xl"
                            muted
                            loop
                            playsInline
                            preload="auto"
                            onCanPlay={handleCanPlay}
                        >
                            <source src={src} type="video/mp4" />
                        </video>

                        {isLoading && (
                            <div className="absolute inset-0 flex items-center justify-center z-20 bg-black/40">
                                <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin" />
                            </div>
                        )}
                    </>
                )}
            </div>
        </motion.div>
    );
};


export default function HeroWithVideos() {
    return (
        <section className="relative min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-900 text-white flex flex-col items-center justify-center px-6 py-24 overflow-hidden">
            <motion.div
                className="text-center mb-16"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                    Watch Our Demo In Action
                </h1>
                <p className="mt-4 text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
                    See how our platform creates engaging ads in min using AI.
                </p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
                {videos.map((video, index) => (
                    <LazyVideoCard key={video.src} src={video.src} index={index} />
                ))}
            </div>
        </section>
    );
}