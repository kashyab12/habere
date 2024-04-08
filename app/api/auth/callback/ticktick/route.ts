import { NextRequest, NextResponse } from "next/server";
import { ttClient, habereSessionOption, HabereSessionData } from "@/lib/auth"
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function GET(req: NextRequest) {
    const code = req.nextUrl.searchParams.get("code")
    const state = req.nextUrl.searchParams.get("state")
    if (!code || !state) {
        return NextResponse.json({
            error: "invalid code or state was received"
        }, {
            status: 401
        })
    }
    const storedState = req.cookies.get("ticktick-oauth-state")?.value
    if (!storedState || storedState != state) {
        console.log("that's not good lol")
        return NextResponse.json({
            error: "could not find stored state or not equal to sent state!"
        }, {
            status: 401
        })
    }
    try {
        const { access_token } = await ttClient.validateAuthorizationCode<any>(code, {
            credentials: process.env.TT_CLIENT_SECRET,
            authenticateWith: "request_body"
        })
        const session = await getIronSession<HabereSessionData>(cookies(), habereSessionOption)
        session.accessToken = access_token
        session.isLoggedIn = true
        await session.save()
    } catch (tokenCaptureErr) {
        console.warn(tokenCaptureErr)
    } finally {
        redirect("/")
    }
}