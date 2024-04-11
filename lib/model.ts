import OpenAI from "openai";
import { Task } from "@/lib/tasks";
import { cache } from "react"

export const taskModel = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY!
});
const seedValue = 92
const systemPrompt = "You are time management coach with tons of experience with helping people prioritize their daily tasks. You output only JSON!"

export default async function inferPriAndRe(taskList: Task[]) {
    const userPrompt = `Please provide the priorities for the tasks within this task list: "${taskList}". Provide the output format as:
    {
        taskTitle: "title as string",
        priority: 1 as a number type,
        why: "why did you provide this priority value? as a string",
        expectedTimeToFinish: 1 as a number type, encoding the number of minutes required to finish this task
    }
    The priority must be a number from 1 to n where n is the total number of tasks within the list. A priority of 1 equates to the highest 
    priority task. The 'why' key should be a brief explanation as to why you have set the respective priority of the task in comparison to the 
    other tasks on the list. Finally, expectedTimeToFinish encodes the time in minutes you gauge it will take to complete the task.
    `
    const completion = taskModel.chat.completions.create({
        messages: [
            {
                role: "system",
                content: systemPrompt
            },
            {
                role: "user",
                content: userPrompt
            }
        ],
        model: "gpt-3.5-turbo",
        response_format: {
            type: "json_object"
        },
        seed: seedValue,
        temperature: 0.5,
    })
    return completion
}