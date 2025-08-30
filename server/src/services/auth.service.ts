import { env } from "../config/env";
import { User, IUser, IUserDocument } from "../models/User";
import jwt from 'jsonwebtoken'
import { SignUpInput } from "../validation/schema/user/create";
import { LoginInput } from "../validation/schema/user/login";
import bcrypt from "bcrypt";



export const generateTokens = async (id: string) => {

    const user = await User.findById(id);
    if (!user)
        throw new Error("User not found");

    const accessToken = createAccessToken(user);
    const refreshToken = createRefreshToken(user);

    user.refreshToken = refreshToken;
    await user.save();
    return { accessToken, refreshToken };
}
/**
 * Verifies whether a given refresh token matches the hashed refresh token
 * stored in the user document.
 *
 * @param refreshToken - The plain-text refresh token to verify.
 * @param user - A Mongoose user document containing the hashed refresh token.
 * @returns A promise that resolves to `true` if the tokens match, otherwise `false`.
 */
const verifyRefreshToken = async (refreshToken: string, user: IUserDocument) => {
    return await bcrypt.compare(refreshToken, user.refreshToken);
};

const createAccessToken = (user: IUserDocument): string => {
    return jwt.sign(
        {
            id: user._id,
        },
        env.accessTokenCode,
        {
            expiresIn: env.accessTokenExpiry
        }
    )
}
const createRefreshToken = (user: IUserDocument): string => {
    return jwt.sign(
        {
            id: user._id,
            email: user.email,
            username: user.username
        },
        env.refreshTokenCode,
        {
            expiresIn: env.refreshTokenExpiry
        }
    )
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
): Promise<{ newUser: Omit<IUser, "password" | "refreshToken"> }> => {

    const user = await User.findOne({
        $or: [{ email: data.email }, { username: data.username }]
    });

    if (user)
        throw new Error("User already exists");

    let newUser = new User(data);

    const { password, refreshToken: _refreshToken, ...newUserObject } = newUser.toObject();

    return { newUser: newUserObject };
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
): Promise<{ user: Omit<IUser, "password" | "refreshToken"> }> => {

    // @TODO: this needs some optimisation as db needs to look for both field 
    // even if only one is valid, planning to modify this input in the zod schema 
    // then add some conditions here
    
    const isUser = await User.findOne(
        { $or: ([{ email: data.emailOrUsername }, { username: data.emailOrUsername }])}
    );

    if (!isUser)
        throw new Error("User not found");

    const isPasswordCorrect = await isUser.isPasswordCorrect(data.password);

    if (!isPasswordCorrect)
        throw new Error("Incorrect password");

    const { password, refreshToken: _refreshToken, ...newUserObject } = isUser.toObject();

    return { user: newUserObject };
}

/**
 * Logout user and remove refreshToken from DB
 */
export const logoutService = async (refreshToken: string): Promise<void> => {

    const decodedToken = jwt.verify(refreshToken, env.refreshTokenCode) as { id: string };

    const user = await User.findById(decodedToken.id);

    if (!user)
        throw new Error("User not found");

    const isVerified = await verifyRefreshToken(refreshToken, user);

    if (!isVerified)
        throw new Error("Invalid refresh token");

    await User.updateOne({ _id: user._id }, { $set: { refreshToken: '' } });
    return;
}

/**
 * Refreshes the access token using the refresh token.
 *
 */
// This function handles the refresh token flow
export const refreshTokenService = (refreshToken: string) => {
    // ... refresh token logic ...
    console.log(`${refreshToken} will be replaced here`)
};
