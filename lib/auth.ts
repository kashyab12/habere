import { SessionOptions } from "iron-session";
import { OAuth2Client } from "oslo/oauth2";

const authorizeEndpoint = "https://ticktick.com/oauth/authorize"
const tokenEndpoint = "https://ticktick.com/oauth/token"
const redirectURI = "http://localhost:3000/api/auth/callback/ticktick"

export const ttClient = new OAuth2Client(process.env.TT_CLIENT_ID!, authorizeEndpoint, tokenEndpoint, { redirectURI })
export interface HabereSessionData {
    accessToken?: string
    isLoggedIn?: boolean
}
export const habereSessionOption: SessionOptions = {
    cookieName: "habere-session",
    password: process.env.SESSION_SECRET!,
    cookieOptions: {
        httpOnly: true,
        secure: process.env.NODE_ENV! === "production"
    }
}