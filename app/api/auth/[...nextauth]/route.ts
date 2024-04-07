import NextAuth from "next-auth";
import {ttProvider} from "@/lib/auth"

export const handler = NextAuth({
    providers: [
        ttProvider
    ],
    debug: true,
    useSecureCookies: false
})

export { handler as GET, handler as POST }