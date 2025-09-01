import { Router } from "express";
import authController from "../../controllers/auth.controller";
import { validator } from "../../validation/validate";
import signUpSchema from "../../validation/schema/user/create";
import loginSchema from "../../validation/schema/user/login";
import { otpVerify } from "../../controllers/otp.controller";
import otpVerifySchema from "../../validation/schema/user/otp";
import resetPasswordSchema from "../../validation/schema/user/resetPassword";
import { authMiddleware } from "../../middlewares/auth.middleware";


const userRouter = Router()

userRouter
    .post('/signin', authController.signUp)
    .post('/login', authController.login)
    .post('/logout', authController.logout)
    .post('/refresh', authController.resetRefreshToken)
    .post('/otp-verify', validator(otpVerifySchema), otpVerify)
    .post('/reset-password', validator(resetPasswordSchema), authMiddleware, authController.resetPassword)

// validator(signUpSchema),
// validator(loginSchema),
export default userRouter;