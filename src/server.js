import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import db from './cnx/database.js';
import path from 'path';
import routes from './routes/index.js';

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use('/api', routes)

app.get('/',(req,res,next)=>{
    res.status(200).send({
        status : 200,
        message : 'Welcome to UZISHA SHOP'});
})
app.use(express.static(path.join(__dirname, 'public')))

app.use('**', (req,res,next)=>{
    res.status(200).send({status:405, msg:"Request not found on the server"})
})

const port = process.env.PORT | 8000;
app.listen(port,()=>{
    console.log(`server run on port ${port}...`)
})