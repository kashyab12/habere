import { NextRequest, NextResponse } from "next/server";
import { ttClient } from "@/lib/auth"
import { generateState } from "oslo/oauth2";

export async function GET(req: NextRequest) {
    const state = generateState()
    const url = await ttClient.createAuthorizationURL({
        state,
        scopes: ["tasks:write", "tasks:read"]
    })
    return NextResponse.redirect(url)
}