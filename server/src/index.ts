import { env } from "./config/env.js";
import connectDB from "./config/db.js";
import app from "./app.js";



async function server(){
    try {
        await connectDB();
        app.listen(env.port, () => {
            console.log(`Server running on http://localhost:${env.port}`);
    })
    } catch (error) {
        throw Error("error start the server!!")
    }
}
server()