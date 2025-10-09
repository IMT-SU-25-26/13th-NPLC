import { createAuthClient } from "better-auth/react"
import { customSessionClient } from "better-auth/client/plugins";
import { auth } from "./auth";
export const {signIn, signOut, useSession, getSession, changePassword} = createAuthClient({
    plugins: [customSessionClient<typeof auth>()],
    /** The base URL of the server (optional if you're using the same domain) */
    baseURL: process.env.BETTER_AUTH_URL
})

