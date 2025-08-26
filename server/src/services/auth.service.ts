import { env } from "../config/env";
import { User, IUserDocument, IUser } from "../models/User";
import jwt from 'jsonwebtoken'

export interface SignUpInput {
    fullName: string
    username: string
    email: string
    password: string
    confirmPassword: string
    termsAccept: boolean
}

/**
 * Registers a new user account.
 *
 * @param data - User input:
 *  - fullName: user's full name
 *  - username: unique username
 *  - email: unique email
 *  - password: chosen password
 *  - confirmPassword: must match `password`
 *  - termsAccept: must be true to accept T&Cs
 *
 * @returns Object containing:
 *  - accessToken: short-lived JWT for requests
 *  - refreshToken: long-lived JWT stored in DB
 *  - newUser: the created user without password/refreshToken
 *
 * @throws Error if:
 *  - passwords do not match
 *  - terms are not accepted
 *  - user already exists (email/username taken)
 */

export const signUpService = async (
    data: SignUpInput
): Promise<{ accessToken: string, refreshToken: string, newUser: Omit<IUser, "password" | "refreshToken"> }> => {
    console.log(data.password, "   ", data.confirmPassword)
    if (data.password !== data.confirmPassword)
        throw new Error("Passwords do not match");

    if (!data.termsAccept)
        throw new Error("You must accept the terms and conditions");

    const user = await User.findOne({
        $or: [{ email: data.email }, { username: data.username }]
    });

    if (user)
        throw new Error("User already exists");

    let newUser = new User(data);

    const { accessToken, refreshToken } = await newUser.generateTokens();

    const { password, refreshToken: _refreshToken, ...newUserObject } = newUser.toObject();

    return { accessToken, refreshToken, newUser: newUserObject };
}


export interface LoginInput {
    identifier: string
    password: string
}

/**
 * Logs in an existing user by email or username.
 *
 * @param data - Login input:
 *  - email: optional, used to find the user
 *  - username: optional, alternative to email
 *  - password: required, must match stored hash
 *
 * @returns Object containing:
 *  - accessToken: short-lived JWT for requests
 *  - refreshToken: long-lived JWT stored in DB
 *  - user: the logged-in user without password/refreshToken
 *
 * @throws Error if:
 *  - neither email nor username is provided
 *  - no matching user exists
 *  - password is incorrect
 */

export const loginService = async (
    data: LoginInput
): Promise<{ accessToken: string, refreshToken: string, user: Omit<IUser, "password" | "refreshToken"> }> => {
console.log(data)
    if (!data.identifier)
        throw new Error("Email or username is required");

    const isUser = await User.findOne(
        {$or: ([ { email: data.identifier}, {username: data.identifier }])}
    );

    if (!isUser)
        throw new Error("User not found");

    const isPasswordCorrect = await isUser.isPasswordCorrect(data.password);

    if (!isPasswordCorrect)
        throw new Error("Incorrect password");

    const { accessToken, refreshToken } = await isUser.generateTokens();

    const { password, refreshToken: _refreshToken, ...newUserObject } = isUser.toObject();

    return { accessToken, refreshToken, user: newUserObject };
}

/**
 * Logout user and remove refreshToken from DB
 */
export const logoutService = async (refreshToken: string): Promise<void> => {

    if (!refreshToken)
        throw new Error("Refresh token is requred")

    const decodedToken = jwt.verify(refreshToken, env.refreshTokenCode) as { id: string };

    const user = await User.findById(decodedToken.id);

    if (!user)
        throw new Error("User not found");

    const isVerified = await user.verifyRefreshToken(refreshToken);

    if (!isVerified)
        throw new Error("Invalid refresh token");

    await User.updateOne({ _id: user._id }, { $set: { refreshToken: '' } });
    return;
}


export interface RefreshTokenInput {
    id: string
    refreshToken: string
}

/**
 * Refreshes the access token using the refresh token.
 *
 */
