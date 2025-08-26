import express from "express";
import cookieParser from "cookie-parser";
import router from './router/index'
const app = express();


app.use(express.json())
app.use(express.urlencoded())
app.use(cookieParser())


app.get('/', (req, res) => {
   res.send("hellow susie!")
})

app.use('/api/v1', router)


export default app;

