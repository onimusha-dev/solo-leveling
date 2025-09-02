import { Otp } from "../models/Otp";
import { generateTokens } from "../services/auth.service";
import nodemailer from "nodemailer"
import { env } from "../config/env";
import { transporter } from "../config/transporter";
import { IUser } from "../models/User";
import crypto from "crypto";
import bcrypt from "bcrypt";


// @NOTE:OTP ganaration and string block

const createAndStoreOtpInDatabase = async (userId: string): Promise<{ sessionId: string, otp: string }> => {
    const generateOTP = (length = 6) => {
        const digits = "0123456789";
        let otp = "";
        for (let i = 0; i < length; i++) {
            const index = crypto.randomInt(0, digits.length);
            otp += digits[index];
        }
        return otp;
    }

    const otp = generateOTP()
    const sessionId = crypto.randomUUID()

    const otpDoc = await Otp.create(
        {
            userId: userId,
            sessionId: sessionId,
            otp: otp,
            expiry: new Date(Date.now() + 5 * 60 * 1000)
        }
    )

    if (!otpDoc)
        throw new Error("something went wrong, try again!")

    return { sessionId, otp }
}

// generate and send otp

export const sendOtpMailService = async (user: Omit<IUser, "password" | "refreshToken"> & { id: string }
): Promise<string> => {

    const { sessionId, otp } = await createAndStoreOtpInDatabase(user.id)

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
    console.log(otp)
    return sessionId;
}

// @NOTE: OTP verification block

export const otpVerifyService = async (data: { sessionId: string, otp: string })
    : Promise<IAuthTokens> => {

    const otpDoc = await Otp.findOne({ sessionId: data.sessionId })

    if (!otpDoc) {
        console.log("otp not found")
        throw new Error("OTP not found")
    }

    const otpMatched = await bcrypt.compare(data.otp, otpDoc.otp)

    if (!otpMatched) {
        console.log("otp not matched")
        throw new Error("OTP not matched")
    }

    if (otpDoc.expiresAt < new Date()) {
        console.log("OTP has expired")
        throw new Error("OTP has expired")
    }

    await Otp.deleteOne({ sessionId: data.sessionId })

    const { accessToken, refreshToken } = await generateTokens(otpDoc.userId.toString())
    return {
        accessToken, refreshToken
    }
}