'use server'

import inferPriAndRe from "@/lib/model";
import { DisplayTask } from "@/lib/model";
import { Task, getTodaysTask } from "@/lib/tasks";

export async function getModelOutput(pendingTasks: Task[], tzOff: string, tz: string): Promise<DisplayTask[]> {
    console.log(`Passed timezone to the server action is ${tz}`)
    const todaysTasks = getTodaysTask(pendingTasks, tzOff, tz)
    const inferObj = await inferPriAndRe(todaysTasks)
    const inferResp = JSON.parse(inferObj.choices?.[0]?.message?.content ?? "{}")
    if (!inferResp?.['prioritizedTaskList']) {
        return []
    } else {
        const modelOutput = inferResp['prioritizedTaskList'] as DisplayTask[]
        return modelOutput
    }
}