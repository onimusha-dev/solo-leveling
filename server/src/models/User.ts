import { Schema, Document, Types, Model, model } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { env } from "../config/env";

// schema types 

export interface IUser {
  fullName: string
  email: string
  username: string
  password: string
  refreshToken: string
  termsAccept: boolean
  userData: {
    bio: string
    gender: string
    ageGroup: string
    work: string
  },
}

export interface IUserDocument extends IUser, Document {
  _id: Types.ObjectId,
  isPasswordCorrect(password: string): Promise<boolean>;
}

// @notes: creating schemas

const userSchema = new Schema<IUserDocument, Model<IUserDocument>>(
  {
    fullName: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      // match: /^\S + @\S +\.\S + $ /,
    },
    username: {
      type: String, required: true,
      unique: true,
      trim: true,
      lowercase: true,
      // match: /^[a-zA-Z0-9_]+$/
      
    },
    password: { type: String, required: true },
    refreshToken: { type: String, default: '' },
    termsAccept: { type: Boolean, default: false },
    userData: {
      bio: { type: String, trim: true, required: false },
      gender: {
        type: String,
        enum: ['male', 'female', 'other', 'unknown'],
        default: 'unknown'
      },
      ageGroup: {
        type: String,
        enum: ['0-11', '12-18', '19-24', '25-34', '35-44', '45-54', '55-64', '65+'],
        default: '0-11'
      },
      work: {
        type: String,
        enum: ['student', 'job', 'unemployed', 'retired']
      },
    },
  },
  { timestamps: true }
)

userSchema.method('isPasswordCorrect', async function (password: string) {
  return await bcrypt.compare(password, this.password)
})


userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
})

userSchema.pre('save', async function (next) {
  if (!this.isModified('refreshToken')) return next();

  const salt = await bcrypt.genSalt(10);
  this.refreshToken = await bcrypt.hash(this.refreshToken, salt);
  next();
})

export const User = model<IUserDocument, Model<IUserDocument>>("User", userSchema)
