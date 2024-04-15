'use client';
import { getModelOutput } from "@/app/actions"
import { DisplayTask } from "@/lib/model"
import { Task } from "@/lib/tasks"
import { useEffect, useState, useTransition } from "react"
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
      const modelOutput = await getModelOutput(pendingTasks, clientTzName)
      setModelOutput(modelOutput)
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