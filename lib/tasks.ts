
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
    tasks: Task[]
}


async function getTodaysTasks() {
    try {
        const todaysTasks: Task[] = []
        const getUsersProjectsResp = await fetch(TickTickAPI.getAllProjects)
        const projectsJSON = await getUsersProjectsResp.json()
        if (getUsersProjectsResp.status != 200) {
            throw new Error(`Received ${getUsersProjectsResp.status} code while fetching user's project.\nResponse JSON: ${projectsJSON}`)
        } else {
            // For each project obtain the tasks
            (projectsJSON as Project[]).forEach(async project => {
                try {
                    // Get specific project data
                    const projectDataResp = await fetch(`${TickTickAPI.getAllProjects}/${project.id}/data`)
                    const projectDataJSON: ProjectData = await projectDataResp.json()
                    projectDataJSON.tasks.forEach(task => {
                        if (task?.dueDate) {
                            const taskDueDate = new Date(task.dueDate)
                            if (isToday(taskDueDate)) {
                                todaysTasks.push(task)
                            }
                        }
                    })

                } catch (fetchTasksErr) {
                    throw fetchTasksErr
                }

            })
        }
    } catch (fetchProjectsErr) {
        throw fetchProjectsErr
    }
}

const isToday = (someDate: Date) => {
    const today = new Date()
    return someDate.getDate() == today.getDate() &&
      someDate.getMonth() == today.getMonth() &&
      someDate.getFullYear() == today.getFullYear()
  }

export default getTodaysTasks