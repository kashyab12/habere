'use client';
import { getModelOutput } from "@/app/actions"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { DisplayTask } from "@/lib/model"
import { Task } from "@/lib/tasks"
import { useEffect, useState } from "react"

export default function TaskTable({ pendingTasks }: { pendingTasks: Task[] }) {
  const [modelOutput, setModelOutput] = useState<DisplayTask[]>([])
  useEffect(() => {
    const updateModelOutput = async () => {
      const today = new Date()
      let tzOff: string = ""
      for(const elem of today.toString().split(" ")) {
          if (elem.startsWith("GMT")) {
              tzOff = elem
              break
          }
      } 
      tzOff = tzOff.replace("GMT", "")
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone
      console.log(`The time on the client is : ${today} and the timezone is: ${tzOff} and ${tz}`)
      const modelOutput = await getModelOutput(pendingTasks, tzOff, tz)
      setModelOutput(modelOutput)
    }
    updateModelOutput()
  }, [pendingTasks])
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