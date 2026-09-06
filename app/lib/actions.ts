"use server";
import { redirect } from "next/navigation";
import { connectDb } from "./mongodb";
import { auth } from "./auth";
import Transaction from "../models/Transaction";
import { revalidatePath } from "next/cache";

export const loginGoogleAction = async () => {
  await connectDb();

  const response = await auth.api.signInSocial({
    body: {
      provider: "google",
    },
  });

  redirect(response.url!);
};

export const tradeAction = async (userId: string, formData: FormData) => {
  await connectDb();

  const data = Object.fromEntries(formData);

  const trade = new Transaction({ userId, ...data });
  await trade.save();

  revalidatePath("/dashboard/position-sizes");
};
