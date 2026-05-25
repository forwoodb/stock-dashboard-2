"use server";
import { redirect } from "next/navigation";
import { connectDb } from "./mongodb";
import { auth } from "./auth";

export const loginGoogleAction = async () => {
  // "use server";
  await connectDb();

  const response = await auth.api.signInSocial({
    body: {
      provider: "google",
    },
  });

  redirect(response.url!);
};
