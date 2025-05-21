import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values"
export default defineSchema({
    users: defineTable({
        name: v.string(),
        email: v.string(),
        picture: v.string(),
        credits: v.number(),
        paymentId: v.optional(v.string())
    }).index("by_email", ["email"]),
    videoData:defineTable({
        uId: v.id("users"),
        topic: v.string(),
        scriptVariant: v.any(),
        script: v.optional(v.string()),
        videoUrl:v.optional(v.string()),
        voiceUrl: v.optional(v.string()),
        avatar: v.optional(v.string()),
        avatarUrl:v.optional(v.string()),
        assests: v.optional(v.any()),
        voice: v.optional(v.any()),
        videoId: v.optional(v.string())
    }).index("by_user", ["uId"])
})