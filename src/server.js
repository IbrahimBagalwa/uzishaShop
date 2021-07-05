import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import db from './cnx/database.js'

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use('**', (req,res,next)=>{
    res.status(200).send({status:405, msg:"Request not found on the server"})
})


const port = process.env.PORT | 8000;
app.listen(port,()=>{
    console.log(`server run on port ${port}...`)
})