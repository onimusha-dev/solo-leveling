import { Request, Response } from "express";

interface requestBody {
    title: string;
    body: string;
    tags: string[];
}

interface resBody {
    success: boolean;
    status: number;
    message: string;
    data: requestBody;
}



const createNote = (req: Request<{}, resBody,requestBody>, res: Response<resBody>) => {
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