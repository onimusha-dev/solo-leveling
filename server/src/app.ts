import express from "express";



import routers from "./router";


const app = express();


app.get('/', (req, res)=>{
   res.send("hellow susie!")
})

app.use('/api/v1', routers.userRouter)


export default app;