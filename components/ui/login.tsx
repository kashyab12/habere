import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import haberePic from '@/public/habere.jpeg'

export function Dashboard() {
    return (
        <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
            <div className="flex items-center justify-center py-12">
                <div className="mx-auto grid w-[350px] gap-6">
                    <div className="grid gap-2 text-center">
                        <h1 className="text-3xl font-bold">Login</h1>
                        <p className="text-balance text-muted-foreground">
                           Prioritize the important things in life.
                        </p>
                    </div>
                    <div className="grid gap-4">
                        <Button variant="outline" className="w-full">
                            Login with TickTick
                        </Button>
                    </div>
                </div>
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
