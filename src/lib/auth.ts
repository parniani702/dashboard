
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../db";
import { schemaAuth } from "../db/schema";
import { admin } from 'better-auth/plugins'
import { nextCookies } from "better-auth/next-js";

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "pg",
        schema: schemaAuth
    }),
    emailAndPassword: {
        enabled: true
    },
    user: {
        deleteUser: {
            enabled: true,
        }
    },
    advanced: {
        useSecureCookies: true,
    },
    trustedOrigins: [
        'https://dashboard-rosy-phi-49.vercel.app',
    ],
    plugins: [
        nextCookies(),
        admin({defaultRole: 'user'})
    ]
});