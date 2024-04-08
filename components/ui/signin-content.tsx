import SignInButton from "@/components/ui/signin-button";

export default function SignInContent() {
    return (
        <div className="mx-auto grid w-[350px] gap-6">
            <div className="grid gap-2 text-center">
                <h1 className="text-3xl font-bold">Login</h1>
                <p className="text-balance text-muted-foreground">
                    Prioritize the important things in life.
                </p>
            </div>
            <div className="grid gap-4">
                <SignInButton />
            </div>
        </div>
    )
}