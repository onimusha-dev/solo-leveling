import express from "express";
import userRouter from "./routes/user.routes";
import noteRouter from "./routes/notes.routes";

const router = express.Router()


router.use('/auth', userRouter)
router.use('/note', noteRouter)







export default router