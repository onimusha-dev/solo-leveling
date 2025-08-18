import { Request, Response } from "express";

const signUp = async (req: Request, res: Response) => {
    try {
        console.log(req.body)
        const { fullName, email, password } = req.body ?? {};
        console.log(fullName, email, password)

        res.send({
            success: true,
            status: 200,
            message: "hellow susie you signed up!",
            data: {
                fullName,
                email,
                password
            }
        })
        return
    }
    catch (error) {
        console.log(error);
        res.send('fuck you')
    }
}


export default {
    signUp,
}