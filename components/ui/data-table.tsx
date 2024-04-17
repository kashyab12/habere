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


export default function DataTable({ modelOutput }: { modelOutput: DisplayTask[] }) {
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
                {modelOutput.length > 0 && modelOutput.map((task, index) => {
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