
import OpenAI from "openai"
import { NextResponse } from "next/server"
import { GENERATE_SCRIPT_PROMPT } from "@/services/prompt";

export const openai = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: process.env.OPENROUTER_API_KEY,
},
)
export async function POST(req) {
    const { userInput } = await req.json();
    const PROMPT = GENERATE_SCRIPT_PROMPT.replace("{topic}", userInput);
    const completion = await openai.chat.completions.create({
        model: "deepseek/deepseek-prover-v2:free",
        messages: [
            { role: "user", content: PROMPT }
        ],
    })
    
    console.log(completion, "completion")
    return NextResponse.json(completion.choices[0].message);
}
