import getTodaysTasks from "@/lib/tasks";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"

async function TaskPriorities() {
    const authHeader = headers().get("Authorization")  
    if (!authHeader) {
      redirect("/")
    } else {
      const todaysTasks = await getTodaysTasks(authHeader)
      console.log(todaysTasks)
      return (
        <div>Hello priorities!</div>
      )
    }
}

export default TaskPriorities