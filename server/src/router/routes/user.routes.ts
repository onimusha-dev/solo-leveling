import { Router } from "express";
import authController from "../../controllers/auth.controller";
import { validator } from "../../validation/validate";
import signUpSchema from "../../validation/schema/user/create";
import loginSchema from "../../validation/schema/user/login";
import { otpVerify } from "../../controllers/otp.controller";


const userRouter = Router()

userRouter
    .post('otp/verify', otpVerify)
    .post('/signin', validator(signUpSchema), authController.signUp)
    .post('/login', validator(loginSchema), authController.login)
    .post('/logout', authController.logout)
    .post('/refresh', authController.resetRefreshToken)


export default userRouter;