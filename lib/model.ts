import OpenAI from "openai";

export const taskModel = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY!
});