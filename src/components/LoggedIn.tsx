import {constants} from "../constants";
import {useEffect, useState} from "react";

function LoggedIn() {

    const [todaysTasks, setTodaysTasks] = useState('')

    useEffect(() => {
        const getTodaysTasks = async () => {
            const todaysTasksReq = await fetch(constants.TT_TODAYS_TASKS)
            const tasksJson = await todaysTasksReq.json()
            setTodaysTasks(tasksJson)
        }
        if (todaysTasks.length == 0) {
            getTodaysTasks()
        }
    }, [])
    return (
        <>
            <h1>habere</h1>
            <div className="card">
                <p>
                   Logged in!
                </p>
            </div>
            <p className="read-the-docs">
                Click on the Vite and React logos to learn more: {todaysTasks}
            </p>
        </>
    )
}

export default LoggedIn