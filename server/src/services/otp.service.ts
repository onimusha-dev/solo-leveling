import { Otp } from "../models/Otp";
import { generateTokens } from "../services/auth.service";
import nodemailer from "nodemailer"
import { env } from "../config/env";
import { transporter } from "../config/transporter";
import { IUser } from "../models/User";
import crypto from "crypto"


const isOtpValid = async (otp: string): Promise<boolean> => {
    const otpDoc = await Otp.findOne({ otp })
    if (!otpDoc || otpDoc.expiresAt < new Date())
        return false
    return true
}


// @NOTE: this is for generating the otp 
const generateOTP = (length = 6) => {
    const digits = "0123456789";
    let otp = "";
    for (let i = 0; i < length; i++) {
        const index = crypto.randomInt(0, digits.length);
        otp += digits[index];
    }
    console.log(otp)
    return otp;
}

// @:NOTE: for generating otp message and send it to the user
export const sendOtpService = async (user: Omit<IUser, "password" | "refreshToken"> & { id: string }) => {
    const otp = generateOTP()

    const otpDoc = await Otp.create(
        {
            userId: user.id,  // <— required
            otp: otp,
            expiry: new Date(Date.now() + 5 * 60 * 1000)
        }
    )

    if (!otpDoc)
        throw new Error("something went wrong, try again!")

    const info = await transporter.sendMail({
        from: `Solo Leveling <${env.smtpUser}>`,
        to: `${user.email}`,
        subject: "Your One-Time Password (OTP)",
        text: `Hello ${user.username},

            Your OTP for logging in is: ${otp}

            This OTP is valid for 5 minutes. Do not share it with anyone.

            If you did not request this, ignore this email.

            Thanks,
            Solo Leveling Team`,
        html: `
                <div style="font-family: sans-serif; line-height: 1.5; max-width: 600px;">
                    <p>Hello <strong>${user.username}</strong>,</p>
                    <p>Your OTP for logging in is:</p>
                    <p style="font-size: 24px; font-weight: bold; color: #1a73e8;">${otp}</p>
                    <p>This OTP is valid for <strong>5 minutes</strong>. Do not share it with anyone.</p>
                    <p>If you did not request this, ignore this email.</p>
                    <p>Thanks,<br>Solo Leveling Team</p>
                </div>
                `
    });
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

// @NOTE: this function will verify the otps
export const otpVerifyService = async (otp: string)
    : Promise<{ accessToken: string, refreshToken: string }> => {
    console.log("otp verify service called")

    const otpDoc = await Otp.findOne({ otp })
    if (!otpDoc)
        throw new Error("Invalid OTP")

    const isValod = await isOtpValid(otp)
    if (!isValod)
        throw new Error("OTP has expired")

    const delepedOtp = await Otp.findByIdAndDelete({ otp })
    if (!delepedOtp)
        throw new Error("something went wrong, try again!")

    const { accessToken, refreshToken } = await generateTokens(otpDoc.userId.toString())
    return {
        accessToken, refreshToken
    }
}