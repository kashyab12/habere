'use server'

import { cachedInference } from "@/lib/model";
import { Task, getTodaysTask } from "@/lib/tasks";

export async function getModelOutput(pendingTasks: Task[], today: Date) {
    const todaysTasks = getTodaysTask(pendingTasks, today)
    const inferObj = await cachedInference(todaysTasks)
    const inferResp = JSON.parse(inferObj.choices?.[0]?.message?.content ?? "{}")
    return inferResp
}