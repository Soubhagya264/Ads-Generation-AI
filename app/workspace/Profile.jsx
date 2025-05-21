"use client";
import React, { useContext } from 'react';
import { UserDetailsContext } from '@/context/UserDetailsContext';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api'; // adjust if your API import path differs
import { FaUserCircle } from 'react-icons/fa';

const Profile = () => {
  const { userDetails } = useContext(UserDetailsContext);

  const getVideosByUser = useQuery(
    api.videoData.getVideosByUser,
    userDetails?._id ? { uId: userDetails._id } : 'skip'
  );

  const formattedDate = userDetails?._creationTime
    ? new Date(userDetails._creationTime).toLocaleString()
    : 'N/A';

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] text-white px-4">
      <div className="max-w-md w-full bg-[#1e1e2f] rounded-2xl shadow-2xl p-6">
        <div className="flex flex-col items-center text-center space-y-4">
          {userDetails?.picture ? (
            <img
              src={userDetails.picture}
              alt="User Avatar"
              className="w-24 h-24 rounded-full border-4 border-[#2c5364] object-cover"
            />
          ) : (
            <FaUserCircle className="w-24 h-24 text-gray-500" />
          )}

          <h2 className="text-2xl font-semibold">{userDetails?.name || 'Unknown User'}</h2>
          <p className="text-sm text-gray-400">{userDetails?.email}</p>

          <div className="mt-6 w-full border-t border-gray-700 pt-4 space-y-3 text-left">
            <p>
              <span className="font-semibold text-gray-400">Credits:</span>{' '}
              {userDetails?.credits ?? 0}
            </p>
            <p>
              <span className="font-semibold text-gray-400">Joined:</span>{' '}
              {formattedDate}
            </p>
            <p className="break-all">
              <span className="font-semibold text-gray-400">User ID:</span>{' '}
              {userDetails?._id}
            </p>
            <p>
              <span className="font-semibold text-gray-400">Videos Created:</span>{' '}
              {getVideosByUser ? getVideosByUser.length : 0}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
