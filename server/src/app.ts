import express from "express";
import cookieParser from "cookie-parser";
import router from './router/index'
import cors from 'cors'

const app = express();


app.use(express.json())
app.use(express.urlencoded())
app.use(cookieParser())
app.use(cors({
   origin: '*',
   credentials: true,

   methods: ['GET', 'POST', 'PUT', 'DELETE']

}))

// sasta logger for now
app.use((req:any, res:any, next:any)=>{
   console.log(`${req.method} ${req.path} ${''}`)
   next()
})

app.get('/', (req, res) => {
   res.send("hellow susie!")
})

app.use('/api/v1', router)


export default app;

