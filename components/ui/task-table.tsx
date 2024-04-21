'use client';
import { DisplayTask } from "@/lib/model"
import { Task } from "@/lib/tasks"
import { useEffect, useState } from "react"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function TaskTable({ pendingTasks }: {
  pendingTasks: Task[]
}) {
  const [modelOutput, setModelOutput] = useState<DisplayTask[]>([])
  useEffect(() => {
    const updateModelOutput = async () => {
      const clientTzName = Intl.DateTimeFormat().resolvedOptions().timeZone
      console.log(`The client timezone is: ${clientTzName}`)
      try {
        const modelResp = await fetch("/api/prioritize/tasks", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            pendingTasks,
            clientTzName
          })
        })
        const modelOutputJSON = await modelResp.json()
        if (modelResp.status != 200) {
          console.log(`Facing issues: ${modelOutputJSON?.error}`)
        } else {
          if (modelOutputJSON?.modelOutput) {
            setModelOutput(modelOutputJSON.modelOutput as DisplayTask[])
          }
        }
      } catch (error) {
        console.log(error)
      }
    }
    updateModelOutput()
  }, [pendingTasks])

  if (modelOutput.length < 1) {
    return null
  } else {
    return (
      < Table >
        <TableCaption>Today&apos;s tasks!</TableCaption>
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
            console.log("Reached")
            return (
              <TableRow key={index}>
                <TableCell className="font-semibold">{task.priority}</TableCell>
                <TableCell>{task.taskTitle}</TableCell>
                <TableCell>{task.why}</TableCell>
                <TableCell>{`${task.expectedTimeToFinish} minutes`}</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table >
    )
  }

  
}