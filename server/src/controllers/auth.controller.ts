import { Request, Response, NextFunction } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { signUpService, loginService, logoutService, refreshTokenService, resetPasswordService } from "../services/auth.service";
import { SignUpInput } from "../validation/schema/user/create";
import { LoginInput } from "../validation/schema/user/login";
import { env } from "../config/env";
import { sendOtpMailService } from "../services/otp.service";
import { ResetPasswordInput } from "../validation/schema/user/resetPassword";
import { IUserDocument } from "../models/User";


const signUp = asyncHandler(async (req: Request<{}, {}, SignUpInput>, res: Response, next: NextFunction)
: Promise<Response | void> => {

    const { fullName, email, username, password, confirmPassword, termsAccept } = req.body;

    const newUser = await signUpService({
        fullName,
        email,
        username,
        password,
        confirmPassword,
        termsAccept
    })

    const sessionId = await sendOtpMailService(newUser)

    res.status(201).send({
        sessionId: sessionId,
        "message": "User created successfully"
    })
})

const login = asyncHandler(async (req: Request<{}, {}, LoginInput>, res: Response, next: NextFunction)
: Promise<Response | void> => {

    const { emailOrUsername, password } = req.body;

    const user = await loginService({
        emailOrUsername,
        password
    })

    const sessionId = await sendOtpMailService(user)

    res.status(201)
        .send({
            sessionId: sessionId,
            "message": "User logged in successfully"
        })
})

const logout = asyncHandler(async (req: Request<{}, {}, string>, res: Response, next: NextFunction)
: Promise<Response | void> => {

    const { refreshToken } = req.cookies;
    if (!refreshToken) {
        res.send("No refresh token provided")
        throw new Error("No refresh token provided")
    }

    await logoutService(refreshToken)

    res.status(200)
        .clearCookie('refreshToken')
        .clearCookie('accessToken')
        .send("user logged out successfully")
})

const resetRefreshToken = asyncHandler(async (req: Request, res: Response, next: NextFunction)
: Promise<Response | void> => {

    const token = req.cookies.refreshToken || req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401)
            .json({
                "message": "No refresh token provided"
            })
    }
    const { accessToken, refreshToken } = await refreshTokenService(token)

    return res.status(200)
        .cookie('accessToken', accessToken, {
            httpOnly: env.httpOnlyCookie,
            secure: env.secureCookie,
            maxAge: 24 * 60 * 60 * 1000
        })
        .cookie('refreshToken', refreshToken, {
            httpOnly: env.httpOnlyCookie,
            secure: env.secureCookie,
            maxAge: 24 * 60 * 60 * 1000
        })
        .json({
            "message": "Access token refreshed successfully"
        })

})

// @NOTE: Password reset controller

interface InputRequest extends Request {
    user?: IUserDocument
}

const resetPassword = asyncHandler(async (req: InputRequest, res: Response, next: NextFunction)
    : Promise<Response | void> => {

    if (!req.user) {
        return res.status(401).json({ error: 'Unauthorized' })
    }

    const userId = req.user._id.toString()

    const data = {
        userId,
        oldPassword: req.body.oldPassword,
        newPassword: req.body.newPassword,
        confirmPassword: req.body.confirmPassword
    }

    await resetPasswordService(data)

    res.status(200)
        .json({
            "message": "Password reset successfully"
        })
})

export default {
    signUp,
    login,
    logout,
    resetRefreshToken,
    resetPassword

}