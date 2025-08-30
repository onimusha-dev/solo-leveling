import { Router } from "express";
import authController from "../../controllers/auth.controller";
import { validator } from "../../validation/validate";
import signUpSchema from "../../validation/schema/user/create";
import loginSchema from "../../validation/schema/user/login";
import { otpVerify } from "../../controllers/otp.controller";


const userRouter = Router()

userRouter
    .post('otp/verify', otpVerify)
    .post('/signin',  authController.signUp)
    .post('/login',  authController.login)
    .post('/logout', authController.logout)
    .post('/refresh', authController.resetRefreshToken)
// validator(signUpSchema),
// validator(loginSchema),
export default userRouter;