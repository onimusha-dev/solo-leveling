import mongoose from "mongoose";

// this is the schema for extra user data
const userData = new mongoose.Schema(
  {
    bio: {
      type: String,
      required: true,
      trim: true,
    },
    gender: {
      type: String,
      required: true,
      trim: true,
    },
    dob: {
      type: String,
      required: true,
      trim: true,
    },
  }
)

// this is the main schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    termsAccept: {
      type: Boolean,
      default: false,
      // required: true,
    },
    userData: [userData],

  }, { timestamps: true }
);

















export const User = mongoose.model("User", userSchema);
