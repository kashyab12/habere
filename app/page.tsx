import { Dashboard } from "@/components/ui/login";
import SignInContent from "@/components/ui/signin-content";
import { headers } from "next/headers";
import { redirect } from "next/navigation";


async function Home() {
  const authHeader = headers().get("Authorization")  
  if (!authHeader) {
    return (
      <Dashboard>
        <SignInContent/>
      </Dashboard>
    );
  } else {
    redirect("/prioritize")
  }
}

export default Home