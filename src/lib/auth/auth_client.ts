import { createAuthClient } from "better-auth/react"
import { customSessionClient } from "better-auth/client/plugins";
import { auth } from "./auth";
export const {signIn, signOut, useSession, getSession} = createAuthClient({
    plugins: [customSessionClient<typeof auth>()],
    /** The base URL of the server (optional if you're using the same domain) */
    baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL
})

