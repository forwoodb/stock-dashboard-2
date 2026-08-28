import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    ticker: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    price: Number,
    dollarAmount: Number,
    fiveDayAvg: Number,
    tenDayAvg: Number,
    twentyDayAvg: Number,
    fiftyDayAvg: Number,
    oneHundredDayAvg: Number,
    twoHundredDayAvg: Number,
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

export default mongoose.models.Transaction ||
  mongoose.model("Transaction", transactionSchema);
