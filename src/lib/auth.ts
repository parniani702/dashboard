
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
// If your Prisma file is located elsewhere, you can change the path


import { nextCookies } from "better-auth/next-js";
import prisma from "./prisma";



export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "sqlite", // or "mysql", "postgresql", ...etc
    }),
    emailAndPassword: {
        enabled: true
    },
    user: {
        deleteUser: {
            enabled: true,
        }
    },
    plugins: [
        nextCookies()
    ]
});