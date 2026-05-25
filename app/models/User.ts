import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  emailVerified: Boolean,
  image: {
    type: String,
  },
  role: {
    type: String,
    required: true,
    default: "user",
  },
  banned: Boolean,
});

export const User = mongoose.models.User || mongoose.model("User", userSchema);
