import { Router } from "express";
import authController from "../../controllers/auth.controller";

import { Request, Response, NextFunction, Application, Express } from "express";




const userRouter = Router()

userRouter.route('/signin')
    .get()
    .post(authController.signUp)



export default userRouter;