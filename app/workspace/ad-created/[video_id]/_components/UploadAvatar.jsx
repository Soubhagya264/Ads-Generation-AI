'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useAdFlow } from '@/context/AdFlowContext';

export default function UploadAvatar() {
    const [avatars, setAvatars] = useState([]);
    const [voices, setVoices] = useState([]);
    const [hoveredAvatar, setHoveredAvatar] = useState(null);
    const [selectedAvatarId, setSelectedAvatarId] = useState(null);
    const [selectedVoiceId, setSelectedVoiceId] = useState(null);
    const { setSelectedAvatar, setSelectedVoice, setStep } = useAdFlow();
    const audioRefs = useRef({});

    useEffect(() => {
        const fetchAvatars = async () => {
            try {
                const response = await axios.get('/api/generate-avatar');
                setAvatars(response.data.avatars);
            } catch (error) {
                console.error('Error fetching avatars', error);
            }
        };
        fetchAvatars();
    }, []);

    useEffect(() => {
        const fetchVoices = async () => {
            try {
                const response = await axios.get('/api/generate-voice');
                setVoices(response.data.voices);
            } catch (error) {
                console.error('Error fetching voices', error);
            }
        };
        fetchVoices();
    }, []);

    const handleAvatarSelect = (avatar) => {
        setSelectedAvatarId(avatar.avatar_id);
        setSelectedAvatar(avatar);
    };

    const handleVoicePlay = (voiceId) => {
        Object.keys(audioRefs.current).forEach((id) => {
            if (id !== voiceId && audioRefs.current[id]) {
                audioRefs.current[id].pause();
                audioRefs.current[id].currentTime = 0;
            }
        });
        audioRefs.current[voiceId]?.play();
    };

    const handleVoiceSelect = (voice) => {
        setSelectedVoiceId(voice.voice_id);
        setSelectedVoice(voice);
    };

    const selectedAvatar = avatars.find(a => a.avatar_id === selectedAvatarId);
    const selectedVoice = voices.find(v => v.voice_id === selectedVoiceId);

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-gray-800 p-8">
            <h1 className="text-3xl font-bold text-white mb-6">Select an Avatar</h1>
            <div className="max-h-[400px] overflow-y-auto pr-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {avatars.map((avatar) => (
                        <motion.div
                            key={avatar.avatar_id}
                            className={`relative rounded-xl overflow-hidden backdrop-blur-lg border shadow-xl cursor-pointer transition-all duration-300 ${selectedAvatarId === avatar.avatar_id
                                    ? 'border-green-500 shadow-green-500/50 scale-105'
                                    : 'border-white/20 hover:scale-105'
                                }`}
                            onClick={() => handleAvatarSelect(avatar)}
                            onMouseEnter={() => setHoveredAvatar(avatar.avatar_id)}
                            onMouseLeave={() => setHoveredAvatar(null)}
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: 'spring', stiffness: 300 }}
                        >
                            {hoveredAvatar === avatar.avatar_id ? (
                                <video
                                    src={avatar.preview_video_url}
                                    autoPlay
                                    muted
                                    loop
                                    className="w-full h-60 object-cover"
                                />
                            ) : (
                                <img
                                    src={avatar.preview_image_url}
                                    alt={avatar.avatar_name}
                                    className="w-full h-60 object-cover"
                                />
                            )}
                            <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/80 via-black/40 to-transparent text-white p-3 text-sm font-medium">
                                {avatar.avatar_name}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <h1 className="text-3xl font-bold text-white mt-12 mb-6">Select a Voice</h1>
            <div className="max-h-[400px] overflow-y-auto pr-2 mt-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {voices.map((voice) => (
                        <motion.div
                            key={voice.voice_id}
                            className={`relative rounded-xl overflow-hidden backdrop-blur-lg border transition-all duration-300 cursor-pointer ${selectedVoiceId === voice.voice_id
                                    ? 'border-green-500 shadow-green-500/50 scale-105'
                                    : 'border-white/20 hover:scale-105'
                                }`}
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: 'spring', stiffness: 300 }}
                        >
                            <div className="flex flex-col items-center justify-center p-4 space-y-4 h-60">
                                <button
                                    className="w-12 h-12 bg-white/10 border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition"
                                    onClick={() => handleVoicePlay(voice.voice_id)}
                                >
                                    ▶️
                                </button>
                                <p className="text-white text-sm font-medium">{voice.name}</p>
                                <button
                                    onClick={() => handleVoiceSelect(voice)}
                                    className="px-4 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700"
                                >
                                    Select
                                </button>
                            </div>
                            <audio
                                ref={(el) => (audioRefs.current[voice.voice_id] = el)}
                                src={voice.preview_audio}
                                hidden
                            />
                        </motion.div>
                    ))}
                </div>
            </div>


            {selectedAvatar && selectedVoice && (
                <>
                    <div className="flex justify-center mt-12">
                        <button
                            className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-lg shadow-lg"
                            onClick={() => setStep((prev) => prev + 1)}
                        >
                            Next
                        </button>
                    </div>

                    <div className="mt-6 p-4 bg-white/5 border border-white/10 rounded-xl text-white max-w-md mx-auto flex items-center space-x-4">
                        <img
                            src={selectedAvatar.preview_image_url}
                            alt={selectedAvatar.avatar_name}
                            className="w-16 h-16 rounded-lg object-cover"
                        />
                        <div>
                            <p className="text-sm">
                                <span className="font-bold">Avatar:</span> {selectedAvatar.avatar_name}
                            </p>
                            <p className="text-sm">
                                <span className="font-bold">Voice:</span> {selectedVoice.name}
                            </p>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
