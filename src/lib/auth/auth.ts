import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@prisma/client";
import { nextCookies } from "better-auth/next-js";

const prisma = new PrismaClient();

export const auth = betterAuth({
  trustedOrigins: [
    "http://localhost:3000",
    "https://nplc.ciputra.ac.id",
    process.env.VERCEL_URL || "https://nplc.vercel.app" // Add this line
  ],
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // Cache duration in seconds
    },
  },
  database: prismaAdapter(prisma, {
    provider: "postgresql", // or "mysql", "postgresql", ...etc
  }),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 6,
    maxPasswordLength: 128,
    autoSignIn: true,
  },
  account: {
    accountLinking: {
      enabled: true,
      // You can add more account-related options here
    },
  },

  plugins: [
    nextCookies(),
  ],
});