"use server";
import { redirect } from "next/navigation";
import { connectDb } from "./mongodb";
import { auth } from "./auth";
import Transaction from "../models/Transaction";

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
  const trade = await new Transaction(data);
  trade.save();
};
