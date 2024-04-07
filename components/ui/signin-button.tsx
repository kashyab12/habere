import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function SignInButton() {
    return (
        <Link href="/api/auth/signin/ticktick">
            <Button variant="outline" className="w-full">
                Login with TickTick
            </Button>
        </Link>
    )
}