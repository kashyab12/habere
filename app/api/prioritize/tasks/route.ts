import inferPriAndRe from "@/lib/model";
import { DisplayTask } from "@/lib/model";
import { Task, getTodaysTask } from "@/lib/tasks";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from 'next/headers'

export async function getModelOutput(pendingTasks: Task[], tzName: string): Promise<DisplayTask[]> {
    console.log(`Passed timezone to the server is ${tzName}`)
    const todaysTasks = getTodaysTask(pendingTasks, tzName)
    const inferObj = await inferPriAndRe(todaysTasks)
    const inferResp = JSON.parse(inferObj.choices?.[0]?.message?.content ?? "{}")
    if (!inferResp?.['prioritizedTaskList']) {
        return []
    } else {
        const modelOutput = inferResp['prioritizedTaskList'] as DisplayTask[]
        return modelOutput
    }
}

interface TaskPostBody {
    pendingTasks: Task[]
    clientTzName: string
}


export async function POST(req: NextRequest) {
    try {
        const reqBody = await req.json() as TaskPostBody
        const modelOutput = await getModelOutput(reqBody.pendingTasks, reqBody.clientTzName)
        if (cookies().has('modelOutput')) {
            cookies().delete('modelOutput')
        }
        cookies().set('modelOutput', JSON.stringify(modelOutput), {
            secure: process.env.NODE_ENV! === "production",
            httpOnly: true,
            path: "/api"
        })
        return NextResponse.json({
            modelOutput
        })
    } catch (jsonErr) {
        console.log(`Error caught while handling request: ${jsonErr}`)
        return NextResponse.json({
            error: jsonErr
        }, {
            status: 502
        })
    }
}