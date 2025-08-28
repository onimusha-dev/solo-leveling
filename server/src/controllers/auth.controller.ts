import { Request, Response, NextFunction } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { signUpService, loginService, logoutService, refreshTokenService } from "../services/auth.service";
import { SignUpInput} from "../validation/schema/user/create";
import { LoginInput } from "../validation/schema/user/login";
import { env } from "../config/env";


const signUp = asyncHandler(async (req: Request<{}, {}, SignUpInput>, res: Response, next: NextFunction) => {
    
    const { fullName, email, username, password, confirmPassword, termsAccept} = req.body;

    const {accessToken, refreshToken, newUser} = await signUpService({
        fullName,
        email,
        username,
        password,
        confirmPassword,
        termsAccept
    })

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
        newUser
    })    
})

const login = asyncHandler(async (req: Request<{}, {}, LoginInput>, res: Response, next: NextFunction) => {
    
    const { anotherField, password } = req.body;

    const {accessToken, refreshToken, user} = await loginService({
        anotherField,
        password
    })

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
        user
    })  

})

const logout = asyncHandler(async (req: Request<{}, {}, string>, res: Response, next: NextFunction) => {
       
    const { refreshToken } = req.cookies;

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