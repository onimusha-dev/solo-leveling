// import { User } from "../models/User";

// export const generateTokens = async (
//     id: string
// ): Promise<{ accessToken: string; refreshToken: string }> => {

//     const user = await User.findById(id);
//     if (!user)
//         throw new Error("User not found");

//     const accessToken = user.createAccessToken();
//     const refreshToken = user.createRefreshToken();

//     user.refreshToken = refreshToken;
//     await user.save();

//     return { accessToken, refreshToken };
// }

