import { Dashboard } from "@/components/ui/login";
import SignInContent from "@/components/ui/signin-content";
import TaskCards from "@/components/ui/task-cards";
import { HabereSessionData, habereSessionOption } from "@/lib/auth";
import getTodaysTasks from "@/lib/tasks";
import { getIronSession } from "iron-session";
import { cookies, headers } from "next/headers";

async function Home() {
  const authHeader = headers().get("Authorization")  
  if (!authHeader) {
    return (
      <Dashboard children={<SignInContent />} />
    );
  } else {
    const todaysTasks = await getTodaysTasks(authHeader)
    console.log(todaysTasks)
    return (
      <Dashboard children={<TaskCards />} />
    )
  }
}

export default Home