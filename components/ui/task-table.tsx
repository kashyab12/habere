'use client';
import { DisplayTask } from "@/lib/model"
import { Task } from "@/lib/tasks"
import { useEffect, useState} from "react"
import DataTable from "./data-table";
import { Suspense } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { LucideCheckCircle } from "lucide-react"

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
          setModelOutput(modelOutputJSON as DisplayTask[])
        }
      } catch (error) {
        console.log(error)
      }
    }
    updateModelOutput()
  }, [pendingTasks])

  return (
    <Suspense fallback= {
      <Alert>
      <LucideCheckCircle className="h-4 w-4" />
      <AlertTitle>Building Priority List</AlertTitle>
      <AlertDescription>
        Prioritizing today&apos;s tasks and providing an approximate time to finish.
      </AlertDescription>
    </Alert>
    }>
    <DataTable modelOutput={modelOutput} />
    </Suspense>
  )
}