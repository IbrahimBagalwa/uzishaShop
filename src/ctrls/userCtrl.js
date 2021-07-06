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
        
        if(result){
            const is_logged = await bcrypt.compare(req.body.password, result.password);
            if(is_logged){
                return res.status(200).json({
                    status: 200,
                    login:true,
                    token: getToken(),
                    user:{
                        id: result.id,
                        nom: result.nom,
                        email: result.email
                    }
                });
            }
        }
        res.status(401).json({
            status:401,
            msg: "impossible de vous connectez"
        });
    }
}