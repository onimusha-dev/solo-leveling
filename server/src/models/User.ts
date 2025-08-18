import { Schema, Document, model } from "mongoose";

// schema types 
export interface IUserData extends Document {
  bio?: string,
  gender: string,
  dob?: Date
}

export interface IUser extends Document {
  fullName: string,
  email: string,
  username: string,
  password: string,
  termsAccept: boolean,
  userData?: IUserData
}

// creating schemas
const userDataSchema: Schema<IUserData> = new Schema(
  {
    bio: { type: String, trim: true, required: false },
    gender: {
      type: String,
      enum: ['male', 'female', 'other', 'unknown'],
      default: 'unknown'
    },
    dob: { type: Date, required: false },
  }
)

const userSchema: Schema<IUser> = new Schema(
  {
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    username: { type: String, required: true, unique: true, trim: true, lowercase: true },
    password: { type: String, required: true },
    termsAccept: { type: Boolean, default: false },
    userData: { type: userDataSchema, required: false },
  },
  { timestamps: true }
)

export const User = model<IUser>("User", userSchema)