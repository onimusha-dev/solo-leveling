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
  verifyRefreshToken(refreshToken: string): Promise<boolean>;
  createAccessToken(): string;
  createRefreshToken(): string;
  generateTokens(): Promise<{ accessToken: string, refreshToken: string }>;
}

export interface IUserModel extends Model<IUserDocument> {
  isUser(): Promise<boolean>;
}

// creating schemas

const userSchema = new Schema<IUserDocument, IUserModel>(
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

userSchema.method('verifyRefreshToken', async function (refreshToken: string) {
  return await bcrypt.compare(refreshToken, this.refreshToken)
})

userSchema.method('createAccessToken', function () {
  return jwt.sign(
    {
      id: this._id,
    },
    env.accessTokenCode,
    {
      expiresIn: env.accessTokenExpiry
    }
  )
})

userSchema.method('createRefreshToken', function () {
  return jwt.sign(
    {
      id: this._id,
      email: this.email,
      username: this.username
    },
    env.refreshTokenCode,
    {
      expiresIn: env.refreshTokenExpiry
    }
  )
})

userSchema.method('generateTokens', async function () {
  const accessToken = this.createAccessToken();
  const refreshToken = this.createRefreshToken();
  this.refreshToken = refreshToken;
  await this.save();
  return { accessToken, refreshToken };
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

userSchema.statics.isUser = () => true

export const User = model<IUserDocument, IUserModel>("User", userSchema)