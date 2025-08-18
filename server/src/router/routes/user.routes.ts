import { Router } from "express";
import authController from "../../controllers/auth.controller";




const userRouter = Router()

userRouter.route('/signin')
    .post(authController.signUp)



export default userRouter;