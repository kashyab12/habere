"use client";

import {Button} from "@/components/ui/button";
import {signIn} from "next-auth/react"

export default function SignInButton() {
    return (
        <Button variant="outline" className="w-full" onClick={() => signIn("ticktick")}>
            Login with TickTick
        </Button>
    )
}