"use server";
import { redirect } from "next/navigation";
import { connectDb } from "./mongodb";
import { auth } from "./auth";

export const loginGoogleAction = async () => {
  await connectDb();

  const response = await auth.api.signInSocial({
    body: {
      provider: "google",
    },
  });

  redirect(response.url!);
};

export const tradeAction = async (formData: FormData) => {
  await connectDb();

  const data = Object.fromEntries(formData);

  console.log(data);
};
