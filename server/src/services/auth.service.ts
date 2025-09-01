import { env } from "../config/env";
import { User, IUser, IUserDocument } from "../models/User";
import jwt from 'jsonwebtoken'
import { SignUpInput } from "../validation/schema/user/create";
import { LoginInput } from "../validation/schema/user/login";
import bcrypt from "bcrypt";


export const generateTokens = async (id: string): Promise<{ accessToken: string, refreshToken: string }> => {

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
const verifyRefreshToken = async (refreshToken: string, user: IUserDocument): Promise<boolean> => {
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

// @NOTE: user account related part

export const signUpService = async (
    data: SignUpInput
): Promise<Omit<IUser, "password" | "refreshToken"> & { id: string }> => {

    const user = await User.findOne({
        $or: [{ email: data.email }, { username: data.username }]
    });

    if (user)
        throw new Error("User already exists");

    const newUser = await User.create(data);

    const { password, refreshToken: _refreshToken, ...newUserObject } = newUser.toObject();

    return { id: newUser._id.toString(), ...newUserObject };
}

export const loginService = async (
    data: LoginInput
): Promise<Omit<IUser, "password" | "refreshToken"> & { id: string }> => {

    // @TODO: this needs some optimisation as db needs to look for both field 
    // even if only one is valid, planning to modify this input in the zod schema 
    // then add some conditions here

    const isUser = await User.findOne(
        { $or: ([{ email: data.emailOrUsername }, { username: data.emailOrUsername }]) }
    );

    if (!isUser)
        throw new Error("User not found");

    const isPasswordCorrect = await isUser.isPasswordCorrect(data.password);

    if (!isPasswordCorrect)
        throw new Error("Incorrect password");

    const { password, refreshToken: _refreshToken, ...newUserObject } = isUser.toObject();

    return { id: isUser._id.toString(), ...newUserObject };
}

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
 * Generates a new access token if a valid refresh token is provided.
 * @param refreshToken - The user's refresh token.
 * @returns A new access token.
 * @throws Error if the refresh token is invalid or expired.
 */

export const refreshTokenService = async (token: string)
    : Promise<{ accessToken: string, refreshToken: string }> => {

    const decodedToken = jwt.verify(token, env.refreshTokenCode) as { id: string };

    const user = await User.findById(decodedToken.id);
    if (!user) {
        throw new Error("User not found.");
    }

    const isTokenValid = await verifyRefreshToken(token, user);
    if (!isTokenValid) {
        throw new Error("Refresh token is invalid or has been revoked.");
    }

    const { accessToken, refreshToken } = await generateTokens(user.id);


    return { accessToken, refreshToken };
};
/**
 * 
 * @param data 
 */
export const resetPasswordService = async (data: { userId: string, oldPassword: string, newPassword: string, confirmPassword: string }): Promise<void> => {

    const user = await User.findById(data.userId);

    if (!user)
        throw new Error("User not found");

    const isPasswordCorrect = await user.isPasswordCorrect(data.oldPassword);
    console.log(user)
    if (!isPasswordCorrect)
        throw new Error("Incorrect password");

    user.password = data.newPassword;

    const passwordUpdated = await user.save();

    if (!passwordUpdated)
        throw new Error("Password not updated");

    return;
}










