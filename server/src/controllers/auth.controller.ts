import { Request, Response, NextFunction } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { signUpService, loginService, logoutService, refreshTokenService } from "../services/auth.service";
import { SignUpInput } from "../validation/schema/user/create";
import { LoginInput } from "../validation/schema/user/login";
import { env } from "../config/env";
import { sendOtpMailService } from "../services/otp.service";


const signUp = asyncHandler(async (req: Request<{}, {}, SignUpInput>, res: Response, next: NextFunction) => {

    const { fullName, email, username, password, confirmPassword, termsAccept } = req.body;

    const newUser = await signUpService({
        fullName,
        email,
        username,
        password,
        confirmPassword,
        termsAccept
    })

    const sessionId = sendOtpMailService(newUser)

    res.status(201).send({
        sessionId: sessionId,
        "message": "User created successfully"
    })
})

const login = asyncHandler(async (req: Request<{}, {}, LoginInput>, res: Response, next: NextFunction) => {

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

const logout = asyncHandler(async (req: Request<{}, {}, string>, res: Response, next: NextFunction) => {

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

// @note i need to think about the fact of preserved routes
// shall i create a new validator or validate in the services lol

const resetRefreshToken = asyncHandler(async (req: Request<{}, {}, { refreshToken: string }>, res: Response, next: NextFunction) => {

    // const { refreshToken } = req.user;

    refreshTokenService("refreshToken")

    res.status(200)
        .cookie('refreshToken', "hi sexy")
        .cookie('accessToken', "hi sexy")
        .send("refresh token reset successfully")
})


export default {
    signUp,
    login,
    logout,
    resetRefreshToken

}