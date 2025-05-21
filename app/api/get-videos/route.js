//get my all videos based on my user Id
import { auth } from '@/auth';
import { api } from '@/convex/_generated/api';
import { useQuery } from "convex/react";
import { useMutation } from "convex/react";
import { v } from "convex/react";
import { NextResponse } from "next/server";
import { use } from "react";
import { useConvex } from "convex/react";


export async function GET(req) {
    const convex = useConvex();
    const userId = await auth.getUserId();
    const videos = await convex.query(api.videoData.GetVideoData, { uId: userId });
    return NextResponse.json(videos);
}
