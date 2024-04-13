'use server'

import { DisplayTask, cachedInference } from "@/lib/model";
import { Task, getTodaysTask } from "@/lib/tasks";

export async function getModelOutput(pendingTasks: Task[], today: Date): Promise<DisplayTask[]> {
    const todaysTasks = getTodaysTask(pendingTasks, today)
    const inferObj = await cachedInference(todaysTasks)
    const inferResp = JSON.parse(inferObj.choices?.[0]?.message?.content ?? "{}")
    if (!inferResp?.['prioritizedTaskList']) {
        return []
    } else {
        const modelOutput = inferResp['prioritizedTaskList'] as DisplayTask[]
        return modelOutput
    }
}