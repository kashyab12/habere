import getTodaysTasks from "@/lib/tasks";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface DisplayTask {
  title: string
  desc: string
  status: number
  priority: number
  why: string
}

async function TaskPriorities() {
  const authHeader = headers().get("Authorization")
  if (!authHeader) {
    redirect("/")
  } else {
    const todaysTasks = await getTodaysTasks(authHeader)
    console.log(todaysTasks)
    return (
      < Table >
        <TableCaption>Today's tasks!</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Priority</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Why</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {todaysTasks.map((task, index) => {
            return (
              <TableRow>
                <TableCell className="font-semibold">{index}</TableCell>
                <TableCell>{task.title}</TableCell>
                <TableCell>Why not!</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table >
    )
  }
}

{/*  */ }

export default TaskPriorities