import OpenAI from "openai";
import { Task } from "@/lib/tasks";
import { cache } from "react"

export const taskModel = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY!
});
const seedValue = 92
const systemPrompt = "You are time management coach with tons of experience with helping people prioritize their daily tasks. You output only JSON!"


export interface DisplayTask {
    taskTitle: string // this should be the same value as the input task title
    priority: string // this should be the priority. You need to provide this value for the task (from 0 to n where n is the total number of input tasks)
    why: string // this should be the reason why you provided the priority for the task
    expectedTimeToFinish: string // the is the amount of time (in minutes) you expect to finish the task
}


async function inferPriAndRe(taskList: Task[]) {
    const userPrompt = `Please provide the priorities for the tasks within this task list: "${JSON.stringify(taskList)}". Please provide output as a ModelOutput type, it has been described below using a typescript interface:
    
    export type ModelOutput = {
        prioritizedTaskList: Task[] 
    }
    
    export interface Task {
        taskTitle: string // this should be the same value as the input task title
        priority: string // this should be the priority. You need to provide this value for the task (from 1 to n where n is the total number of input tasks)
        why: string // this should be the reason why you provided the priority for the task
        expectedTimeToFinish: string // the is the amount of time (in minutes) you expect to finish the task
    }

    Please make sure the taskTitle attribute within the Task interface has the same value as the "title" attribute in the input task list. Also, the smaller the number for the priority 
    the more important the task is to complete. Please return the prioritizedTaskList in ascending order of priority.
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

export default inferPriAndRe