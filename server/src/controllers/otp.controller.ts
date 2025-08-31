import { Request, Response, NextFunction } from "express";
import { otpVerifyService } from "../services/otp.service";
import { env } from "../config/env";

export const otpVerify = async (req: Request, res: Response, next: NextFunction) => {
try {
    const otp = req.body.otp; // get input otp from req.body

    if (!otp)
        throw new Error("OTP is required")

    console.log("otp verify controller called")

    const { accessToken, refreshToken } = await otpVerifyService(req.body.otp)

    res.status(201)
        .cookie('refreshToken', refreshToken, {
            httpOnly: env.httpOnlyCookie,
            secure: env.secureCookie,
            maxAge: 24 * 60 * 60 * 1000
        })
        .cookie(
            'accessToken', accessToken, {
            httpOnly: env.httpOnlyCookie,
            secure: env.secureCookie,
            maxAge: 24 * 60 * 60 * 1000
        }
        )
        .send({
            "message": "OTP verified successfully"
        })
} catch (error) {
    console.log(error)
}
}