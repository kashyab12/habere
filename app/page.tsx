import { Dashboard } from "@/components/ui/login";
import SignInButton from "@/components/ui/signin-button";
import SignInContent from "@/components/ui/signin-content";
import TaskCards from "@/components/ui/task-cards";
import { HabereSessionData, habereSessionOption } from "@/lib/auth";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

async function Home() {
  const sessionCookie = await getIronSession<HabereSessionData>(cookies(), habereSessionOption)
  if (!sessionCookie.isLoggedIn) {
    return (
      <Dashboard children={<SignInContent />} />
    );
  } else {
    return (
      <Dashboard children={<TaskCards />} />
    )
  }
}

export default Home