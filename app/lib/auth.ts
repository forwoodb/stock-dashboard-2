import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { nextCookies } from "better-auth/next-js";
import { admin } from "better-auth/plugins";

const dbUrl = process.env.MONGODB_URL;

const client = new MongoClient(dbUrl!);

const db = client.db();

export const auth = betterAuth({
  database: mongodbAdapter(db, { client, usePlural: true }),
  emailAndPassword: {
    enabled: true,
  },
  baseURL: process.env.BETTER_AUTH_URL,
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  plugins: [admin(), nextCookies()],
});
