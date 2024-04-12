import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { HabereSessionData, habereSessionOption } from "@/lib/auth";

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
}

export async function middleware(request: NextRequest) {
    const session = await getIronSession<HabereSessionData>(cookies(), habereSessionOption)
    if ((!session.isLoggedIn || !session.accessToken)) {
        if (request.nextUrl.pathname != "/") {
            return NextResponse.next()
        } else {
            // Navigate to the sign in page basically
            return NextResponse.redirect(new URL('/', request.url))
        }
    } else {
        const authHeader = `Bearer ${session.accessToken}`
        const response = NextResponse.next({
            request: request
        })
        response.headers.set('Authorization', authHeader)
        return response
    }
} 