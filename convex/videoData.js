import {v} from "convex/values"
import { mutation, query } from "./_generated/server";

export const CreateVideoData = mutation(async (ctx, args) => {
    const result = await ctx.db.insert("videoData", {
        ...args,
    });
    return result;
});
// GetvideoData
export const GetVideoData = mutation(async (ctx, args) => {
    const result = await ctx.db
        .query("videoData")
        .filter((q) => q.eq(q.field("_id"), args.vid))
        .collect();
    return result[0];
});
export const UpdateVideoData = mutation(async (ctx, args) => {
    const result = await ctx.db
        .query("videoData")
        .filter((q) => q.eq(q.field("_id"), args.vid))
        .collect();

    if (result.length === 0) return;

    await ctx.db.patch(result[0]._id, {
        uId: args.uId,
        videoUrl: args.videoUrl,
        videoId: args.videoId,
    });
});
export const getVideosByUser = query({
    args: { uId: v.id("users") },
    handler: async (ctx, args) => {
        return await ctx.db
            .query("videoData")
            .withIndex("by_user", (q) => q.eq("uId", args.uId))
            .collect();
    },
});

