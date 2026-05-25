import mongoose from "mongoose";

const dbUrl = process.env.MONGODB_URL;

export const connectDb = async () => {
  try {
    if (dbUrl) {
      await mongoose.connect(dbUrl);
    } else {
      console.log("No database url detected");
    }
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log(error);
  }
};
