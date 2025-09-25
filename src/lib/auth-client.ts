import { createAuthClient } from "better-auth/react"
export const authClient = createAuthClient({
    // baseURL: "https://dashboard-rosy-phi-49.vercel.app",
    baseURL: 'http://localhost:3000',
})