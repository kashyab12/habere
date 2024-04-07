import {type OAuthConfig} from "next-auth/providers/oauth";

export const ttProvider= {
    id: "ticktick",
    name: "TickTick",
    type: "oauth",
    clientId: process.env.TT_CLIENT_ID,
    clientSecret: process.env.TT_CLIENT_SECRET,
    authorization: {
        url: "https://ticktick.com/oauth/authorize",
        params: {
            scope: "tasks:write tasks:read",
            response_type: "code"
        }
    },
    token: "https://ticktick.com/oauth/token",
} as OAuthConfig<any>