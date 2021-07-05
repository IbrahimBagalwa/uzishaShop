import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';


dotenv.config();
const app = express();
app.use(express.json())
app.use(express.urlencoded({extended:false}))


const port = process.env.PORT | 8000;
app.listen(port,()=>{
    console.log(`server run on port ${port}...`)
})