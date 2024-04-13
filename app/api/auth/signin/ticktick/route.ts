import { NextRequest, NextResponse } from "next/server";
import { ttClient } from "@/lib/auth"
import { generateState } from "oslo/oauth2";
import { cookies } from "next/headers";

export async function GET(req: NextRequest) {
    const state = generateState()
    const url = await ttClient.createAuthorizationURL({
        state,
        scopes: ["tasks:write", "tasks:read"]
    })
    const response = NextResponse.redirect(url, {
        'status': 302,
        'headers': {
            'cache-control': 'no-cache'
        }
    })
    // Session cookie or nah?
    response.cookies.set("ticktick-oauth-state", state)
    return response
}