import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import haberePic from '@/public/habere.jpeg'
import SignInButton from "@/components/ui/signin-button";

export function Dashboard({ children }: {children: JSX.Element}) {
    return (
        <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
            <div className="flex items-center justify-center py-12">
                {children}
            </div>
            <div className="hidden bg-muted lg:block">
                <Image
                    src={haberePic}
                    alt="Prioritize the important things in life"
                    className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                />
            </div>
        </div>
    )
}
