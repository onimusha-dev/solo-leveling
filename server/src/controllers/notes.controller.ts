import { Request, Response } from "express";




const createNote = (req: Request, res: Response) => {
    try {
            const { title, body, tags } = req.body

            console.log(title, body, tags)
            res.json()

    } catch (error) {
        console.log(error)
    }
}


export default {
    createNote
}