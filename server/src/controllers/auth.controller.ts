import { Request, Response, NextFunction } from "express";

interface SignUpBody {
    fullName: string;
    email: string;
    password: string;
}

interface signUpResponse {
    success: boolean;
    status: number;
    message: string;
    data: SignUpBody;
    token?: string;
}


const signUp = async (req: Request<{}, signUpResponse, SignUpBody>, res: Response<signUpResponse>) => {
    try {
        const { fullName, email, password } = req.body;
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
    }
    catch (error) {
        console.log(error);
    }
}


export default {
    signUp
}