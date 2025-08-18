import express from "express";


import router from './router/index'
const app = express();


app.use(express.json())
app.use(express.urlencoded())


app.get('/', (req, res) => {
   res.send("hellow susie!")
})

app.use('/api/v1', router)


export default app;