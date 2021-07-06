 import userSchema from '../models/userModel';
 import bcrypt from 'bcrypt';
 import dotenv from 'dotenv';
 import { getToken } from '../middlewares/util';
import user from 'c:/users/abraham/desktop/api-m-auto/models/user';

dotenv.config();

const userCtrl = {
    userLogin: async (req, res)=>{
        let result =  await user.findOne({
            phone : req.body.phone
        }).then().catch(err => console.error(er))
        console.log("result", result)
    }
}