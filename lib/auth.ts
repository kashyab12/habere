import { OAuth2Client } from "oslo/oauth2";
const authorizeEndpoint = "https://ticktick.com/oauth/authorize"
const tokenEndpoint = "https://ticktick.com/oauth/token"
const redirectURI = "http://localhost:3000/api/auth/callback/ticktick"
export const ttClient = new OAuth2Client(process.env.TT_CLIENT_ID ?? "", authorizeEndpoint, tokenEndpoint, {redirectURI})