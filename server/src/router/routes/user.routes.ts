import { Router } from "express";
import authController from "../../controllers/auth.controller";
import { validator } from "../../validation/validate";
import signUpSchema from "../../validation/schema/user/create";
import loginSchema from "../../validation/schema/user/login";
import { otpVerify } from "../../controllers/otp.controller";
import { Request, Response, NextFunction } from "express";
import app from "../../app";


const userRouter = Router()

userRouter
    .post('/signin', authController.signUp)
    .post('/login', authController.login)
    .post('/logout', authController.logout)
    .post('/refresh', authController.resetRefreshToken)
    .post('/otp-verify', otpVerify)
// validator(signUpSchema),
// validator(loginSchema),
export default userRouter;