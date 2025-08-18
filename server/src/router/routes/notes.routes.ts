import { Router } from "express";
import notesController from "../../controllers/notes.controller";



const noteRouter = Router()

noteRouter.route('/create')
    .post(notesController.createNote)



export default noteRouter;