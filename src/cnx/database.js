import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGO_URI;
mongoose.connect(uri,{
    useNewUrlParser:true,
    useUnifiedTopology:true, 
    useCreateIndex:true
})
export default mongoose