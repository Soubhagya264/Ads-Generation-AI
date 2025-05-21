'use client';

import { useContext, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";
import { UserDetailsContext } from "@/context/UserDetailsContext";
import { useUser } from "@clerk/nextjs";
export default function ShowVideo() {
    const searchParams = useSearchParams();
    const HeyvideoId = searchParams.get('video_id');
    const videoId = localStorage.getItem("videoId");

    const { userDetails } = useContext(UserDetailsContext);
    const [videoUrl_, setVideoUrl_] = useState(null);
    const [loading, setLoading] = useState(true);
    const [retryCount, setRetryCount] = useState(0);
    const [error, setError] = useState(null);
    const updateVideoData = useMutation(api.videoData.UpdateVideoData);
    const getVideoData = useMutation(api.videoData.GetVideoData); // Convex mutation for updating video data
    const updateUser = useMutation(api.user.UpdateUser); // Convex mutation for updating user data
    const router = useRouter();
    const { user, isLoaded } = useUser();
    

    useEffect(() => {
        console.log('Video ID:', videoId, "videoId");
       
        if (!HeyvideoId) return;
        console.log(process.env.NEXT_PUBLIC_HEYGEN_API_KEY,"process.env.HEYGEN_API_KEY")

        const fetchVideo = async () => {
            try {
                console.log("started calling api..........")
                const res = await axios.get(`https://api.heygen.com/v1/video_status.get?video_id=${HeyvideoId}`, {
                    headers: {
                        'accept': 'application/json',
                        'x-api-key': process.env.NEXT_PUBLIC_HEYGEN_API_KEY
                        ,
                        'Content-Type': 'application/json',
                    },
                });
                console.log(res.data, "res.data")
                const url = res.data?.data?.video_url;
                const status = res.data?.data?.status;
                console.log(status, "status")
                if (!url || status !== 'completed') {
                    setRetryCount((prev) => prev + 1);
                    if (retryCount > 20) {
                        setError('Failed to fetch video status. Please Refresh the page or comeback later ');
                        // only store its hegenId to db for future work
                        await updateVideoData({
                            videoId: HeyvideoId,
                            uId: userDetails?._id || user.id,
                            vid: videoId
                        });
                        setLoading(false);
                        return;
                    }
                    setTimeout(fetchVideo, 15000); // Retry every 10 seconds
                }
                //do not do operation if it is stored in db
                console.log("getVideoData", videoId)
                try{
                    const videoData = await getVideoData({ vid: videoId });
                    if (videoData?.videoUrl) {
                        setVideoUrl_(videoData.videoUrl);
                        setLoading(false);
                        return;
                    }
                }
                catch(err){
                    console.log(err, "err")
                }
                if (url && videoId) {
                    const uId = userDetails?._id || user.id;
                    console.log("db operation start")
                    const dbres = await updateVideoData({
                        videoId: HeyvideoId, videoUrl: url,
                        uId: uId,
                        vid: videoId
                    }); // Update video URL in Convex DB
                    // update credit by reducing 2 points
                    await updateUser({ _id: uId, credits: userDetails.credits - 2 });
                    console.log("db operation end", dbres)
                    setVideoUrl_(url);
                    setLoading(false);
                }
            } catch (err) {
                console.error(err);
                setError('Failed to fetch video status.');
                setLoading(false);
            }
        };


        // Initial 4-minute delay
        const delay = setTimeout(fetchVideo, 300000);

        return () => clearTimeout(delay);
    }, [videoId, getVideoData, HeyvideoId]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white px-4 py-10">
            <div className="max-w-2xl w-full text-center">
                <h1 className="text-4xl font-bold mb-6">🎥 Your Video</h1>

                {loading && !error && (
                    <div className="space-y-6">
                        <div className="w-16 h-16 mx-auto border-4 border-blue-400 border-dashed rounded-full animate-spin"></div>
                        <p className="text-lg text-blue-300">Preparing your video, please wait...</p>
                        <p className="text-sm text-gray-400">This may take up to 5 minutes.</p>
                        {retryCount > 0 && (
                            <p className="text-sm text-yellow-400">Retry attempt: {retryCount}</p>
                        )}
                    </div>
                )}

                {error && (
                    <div className="text-red-500 font-semibold mt-4">
                        ❌ {error}
                    </div>
                )}

                {videoUrl_ && (
                    <div className="mt-10">
                        <video
                            src={videoUrl_}
                            controls
                            autoPlay
                            className="w-full max-w-xl rounded-xl shadow-lg"
                        />
                        <p className="mt-4 text-green-400 font-semibold">✅ Video is ready!</p>
                    </div>
                )}
                {/* go to my video*/}
                {videoUrl_ && (<button
                    onClick={() => router.push('/workspace/my-videos')}
                    className="px-6 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white font-semibold mt-6"
                >
                    Go to My Videos
                </button>)}

            </div>
        </div>
    );
}
