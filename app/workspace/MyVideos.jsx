"use client";
import React, { useContext, useEffect, useState } from "react";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react"; // for future use if you need to delete/update videos
import { UserDetailsContext } from "@/context/UserDetailsContext";
import { useQuery } from "convex/react";

const MyVideos = () => {
  const { userDetails } = useContext(UserDetailsContext);
  const [videos, setVideos] = useState(null);
  const [loading, setLoading] = useState(true);

  const getVideosByUser = useQuery(
    api.videoData.getVideosByUser,
    userDetails?._id ? { uId: userDetails._id } : "skip"
  );

  useEffect(() => {
    if (userDetails?._id && getVideosByUser) {
      console.log(getVideosByUser)
      setVideos(getVideosByUser);
      setLoading(false);
    }
  }, [userDetails, getVideosByUser]);

  return (
    <div className="p-6 max-w-5xl mx-auto min-h-screen ">
      <h2 className="text-2xl font-bold mb-6">🎬 My Generated Videos</h2>

      {!userDetails?._id ? (
        <p className="text-gray-500">Loading user info...</p>
      ) : loading ? (
        <p className="text-gray-500">Loading videos...</p>
      ) : videos?.length === 0 ? (
        <p className="text-gray-400">You haven’t created any videos yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => (
            <div
              key={video._id}
              className="border rounded-xl shadow hover:shadow-lg transition duration-300 overflow-hidden bg-gradient-to-bl"
            >
              {video.videoUrl ? (
                <video
                  controls
                  src={video.videoUrl}
                  className="w-full h-48 object-cover"
                />
              ) : (
                <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-500">
                  Processing...
                </div>
              )}
              <div className="p-4">
                <h3 className="font-semibold text-lg truncate">{video.topic}</h3>
                {/* <p className="text-sm text-gray-600 mt-1">
                  Script: {video.script?.slice(0, 60)}...
                </p> */}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyVideos;
