import process from "./config/config"

import connectDB from "./config/db";
import app from "./app";


const port:string = process.env.PORT || "5500";

async function server(){
    try {
        await connectDB();
        app.listen(port, () => {
            console.log(`Server running on http://localhost:${port}`);
    })
    } catch (error) {
        throw Error("error start the server!!")
    }
}

server()