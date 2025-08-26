import { Router } from "express";
import authController from "../../controllers/auth.controller";




const userRouter = Router()

userRouter
    .post('/signin', authController.signUp)
    .post('/login', authController.login)
    .post('/logout', authController.logout)


export default userRouter;