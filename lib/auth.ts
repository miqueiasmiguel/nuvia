import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";

import { prisma } from "./prisma";

const CACHE_DURATION_IN_SECONDS = 60 * 5;

export const auth = betterAuth({
  user: {
    additionalFields: {
      stripeCustomerId: {
        type: "string",
        required: false,
      },
    },
  },
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  appName: process.env.NEXT_PUBLIC_APP_NAME,
  socialProviders: {
    google: {
      prompt: "select_account",
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  session: {
    cookieCache: {
      enabled: true,
      maxAge: CACHE_DURATION_IN_SECONDS,
    },
  },
  plugins: [nextCookies()],
});
