import { DateTime } from "luxon"

const ttApiBase = "https://api.ticktick.com"
const TickTickAPI = {
    getAllProjects: new URL('/open/v1/project', ttApiBase)
}

interface Project {
    id: string
    name: string
    color: string
    closed: boolean
    groupId: string
    viewMode: string
    permission: string
    kind: string
}

export interface Task {
    id: string
    isAllDay?: boolean
    projectId: string
    title: string
    content?: string
    desc?: string
    timeZone?: string
    repeatFlag?: string
    startDate?: string
    dueDate?: string
    reminders?: string[]
    priority?: number
    status: number // 0 (pending) or 2 (complete)
    completedTime?: string
    sortOrder?: number
    items?: ChecklistItem[]
}

export interface ChecklistItem {
    id: string
    status: number
    title: string
    sortOrder?: number
    startDate: string
    isAllDay: boolean
    timeZone: string
    completedTime?: string
}

interface ProjectData {
    project: Project
    tasks?: Task[]
}

async function getProjectsReq(authHeader: string) {
    const getUsersProjectsResp = fetch(TickTickAPI.getAllProjects, {
        headers: {
            "Authorization": authHeader
        },
        next: {
            revalidate: 120
        }
    })
    return getUsersProjectsResp
}

async function getTodaysTasksReq(projectID: string, authHeader: string) {
    const projectDataResp = fetch(`${TickTickAPI.getAllProjects}/${projectID}/data`, {
        headers: {
            "Authorization": authHeader
        },
        next: {
            revalidate: 120
        }
    })
    return projectDataResp
}


async function getPendingTasks(authHeader: string): Promise<Task[]> {
    try {
        const pendingTasks: Task[] = []
        const getUsersProjectsResp = await getProjectsReq(authHeader)
        const projectsJSON = await getUsersProjectsResp.json()
        if (getUsersProjectsResp.status != 200) {
            throw new Error(`Received ${getUsersProjectsResp.status} code while fetching user's project.\nResponse JSON: ${projectsJSON}`)
        } else {
            // For each project obtain the tasks
            for (const project of projectsJSON as Project[]) {
                console.log("Iterating through project")
                // Get specific project data
                const projectDataResp = await getTodaysTasksReq(project.id, authHeader)
                const projectDataJSON: ProjectData = await projectDataResp.json()
                if (projectDataJSON.tasks === undefined) continue
                for (const task of projectDataJSON.tasks) {
                    if (task?.status == 0) {
                        pendingTasks.push(task)
                    }
                }
            }
            return pendingTasks
        }
    } catch (fetchProjectsErr) {
        throw fetchProjectsErr
    }
}

export const getTodaysTask = (pendingTasks: Task[], tzName: string): Task[] => {
    const todaysTasks: Task[] = []
    console.log(`Passed timezone to getTodaysTask is ${tzName}`)
    for (const task of pendingTasks) {
        if (task?.dueDate) {
            const dueDate = DateTime.fromISO(task.dueDate.split("+")[0]).setZone(tzName, {
                keepLocalTime: true
            })
            if (isToday(dueDate, tzName)) {
                console.log(`OG due date: ${task.dueDate}, and new due date with adjusted TZ: ${dueDate.toString()}`)
                todaysTasks.push(task)
            }
        }
    }
    return todaysTasks
}

const isToday = (dueDate: DateTime, tzInfo: string) => {
    const today = DateTime.now().setZone(tzInfo)
    console.log(`Within isToday: today for client: ${today} and due date: ${dueDate.toString()}`)
    return dueDate.hasSame(today, "day")
}

export default getPendingTasks