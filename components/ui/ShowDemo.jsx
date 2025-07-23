"use client";

import { motion } from "framer-motion";

const features = [
    { src: "/demopic1.png", title: "Ads1" },
    { src: "/demopic2.png", title: "Ads2" },
    { src: "/demopic3.png", title: "Ads3" },
];

const GlassFeatureCard = ({ src, title, index }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.2, duration: 0.6 }}
        className="relative rounded-3xl overflow-hidden shadow-xl border border-white/20 backdrop-blur-md bg-white/10 group hover:scale-105 transition-transform duration-300"
    >
        <img
            src={src}
            alt={title}
            className="w-full h-72 object-cover rounded-3xl brightness-95 group-hover:brightness-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent rounded-3xl z-10" />
       
    </motion.div>
);

export default function HeroWithImages() {
    return (
        <section className="relative min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-900 text-white px-6 py-24 flex flex-col items-center justify-center overflow-hidden">
            <motion.div
                className="text-center max-w-3xl mb-16"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-blue-500 via-pink-500 to-purple-500 bg-clip-text text-transparent">
                    Unlock the Future of AI Ads
                </h1>
                <p className="mt-4 text-lg md:text-xl text-gray-300">
                    This is how you can generate ads for your product using AI
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full max-w-6xl">
                {features.map((item, index) => (
                    <GlassFeatureCard
                        key={item.src}
                        src={item.src}
                        title={item.title}
                        index={index}
                    />
                ))}
            </div>
        </section>
    );
}
