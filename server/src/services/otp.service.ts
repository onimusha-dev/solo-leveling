import { Otp, IUser } from "../models/Otp";
import { generateTokens } from "../services/auth.service";



export const otpVerifyService = async (otp: string)
    : Promise<{ accessToken: string, refreshToken: string }> => {
    console.log("otp verify service called")

    const otpDoc = await Otp.findOne({ otp })
    if (!otpDoc)
        throw new Error("Invalid OTP")

    
    const {accessToken, refreshToken} = await generateTokens(otpDoc.userId.toString())
    return {
        accessToken, refreshToken
    }
}