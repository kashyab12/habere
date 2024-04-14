import getPendingTasks from "@/lib/tasks";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import TaskTable from "@/components/ui/task-table";


async function TaskPriorities() {
  const authHeader = headers().get("Authorization")
  if (!authHeader) {
    redirect("/")
  } else {
    const pendingTasks = await getPendingTasks(authHeader)
    return (
      <TaskTable pendingTasks={pendingTasks}/>
    )
  }
}

export default TaskPriorities