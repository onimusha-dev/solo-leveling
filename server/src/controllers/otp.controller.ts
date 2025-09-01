import { Request, Response, NextFunction } from "express";
import { otpVerifyService } from "../services/otp.service";
import { env } from "../config/env";
import { asyncHandler } from "../utils/asyncHandler";

export const otpVerify = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {

        const { sessionId, otp } = req.body
        const { accessToken, refreshToken } = await otpVerifyService({ sessionId, otp })

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

    }
)




