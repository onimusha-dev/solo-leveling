import express from "express";

const app =express();


app.get('/', (req, res)=>{
   res.send("hellow susie!")
})



export default app;