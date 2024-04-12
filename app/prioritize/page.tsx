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
import { cachedInference, DisplayTask } from "@/lib/model";


async function TaskPriorities() {
  const authHeader = headers().get("Authorization")
  if (!authHeader) {
    redirect("/")
  } else {
    const todaysTasks = await getTodaysTasks(authHeader)
    console.log(todaysTasks)
    const inferObj = await cachedInference(todaysTasks)
    const inferResp = JSON.parse(inferObj.choices?.[0]?.message?.content ?? "{}")
    if (!inferResp?.['prioritizedTaskList']) {
      console.log("waduhek")
      return (
        <div>waduhek</div>
      )
    } else {
      console.log(inferResp)
      const modelOutput = inferResp?.['prioritizedTaskList'] as DisplayTask[]
      console.log(modelOutput)
      return (
        < Table >
          <TableCaption>Today's tasks!</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Priority</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Why</TableHead>
              <TableHead>Time to finish</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {modelOutput.map((task, index) => {
              return (
                <TableRow key={index}>
                  <TableCell className="font-semibold">{task.priority}</TableCell>
                  <TableCell>{task.taskTitle}</TableCell>
                  <TableCell>{task.why}</TableCell>
                  <TableCell>{task.expectedTimeToFinish}</TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table >
      )
    }
  }
}

export default TaskPriorities