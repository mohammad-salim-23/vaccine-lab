import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "./db";
import  authSchema from "../../db/schema/auth.schema";
import { nextCookies } from "better-auth/next-js";

export const auth = betterAuth({
  appName: "Hackathon",
  rateLimit: {
    enabled: process.env.NODE_ENV === "production",
    window: 60 * 15, // 15 minutes
    max: 100, // More reasonable limit for production
  },
  session: {
    expiresIn: 60 * 60 * 24 * 30, // 30 days for better user experience
    updateAge: 60 * 60 * 24, // 1 day
    preserveSessionInDatabase: true,
  },
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: authSchema
  }),
  emailAndPassword: {
    enabled: true,
  },
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
  secret: process.env.BETTER_AUTH_SECRET || process.env.AUTH_SECRET,
  plugins: [
    nextCookies(),
  ],
});
