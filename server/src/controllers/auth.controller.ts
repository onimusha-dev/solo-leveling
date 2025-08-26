import { Request, Response, NextFunction } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { signUpService, loginService, logoutService } from "../services/auth.service";
import { SignUpInput, LoginInput } from "../services/auth.service";
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
        maxAge: 24 * 60 * 60 * 1000
    })
    .cookie(
        'accessToken', accessToken, {
            httpOnly: env.httpOnlyCookie,
            maxAge: 24 * 60 * 60 * 1000
        }
    )
    .send({
        newUser
    })    
})

const login = asyncHandler(async (req: Request<{}, {}, LoginInput>, res: Response, next: NextFunction) => {
    
    const { email, password } = req.body;

    const {accessToken, refreshToken, user} = await loginService({
        email,
        password
    })

    res.status(201)
    .cookie('refreshToken', refreshToken, {
        httpOnly: env.httpOnlyCookie,
        // maxAge: 24 * 60 * 60 * 1000
    })
    .cookie(
        'accessToken', accessToken, {
        httpOnly: env.httpOnlyCookie,
        // maxAge: 24 * 60 * 60 * 1000
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



export default {
    signUp,
    login,
    logout
}