import userSchema from '../models/userModel';
// import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { generatorToken, getToken } from '../middlewares/util';
import formatDate from 'date-format';
import fileUpload from 'express-fileupload';
import bcrypt from 'bcrypt';
import path from 'path';
import util from 'util'
dotenv.config();

const userCtrl = {
    userLogin: async (req, res)=>{
        let result =  await userSchema.findOne({
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
                        username: result.username,
                        email: result.email
                    }
                });
            }
        }
        res.status(401).json({
            status:401,
            msg: "impossible de vous connectez"
        });
    },

    userRegister: async (req,res)=>{
        const {username,email,phone,password,photo, isAdmin} = req.body;

        
            let file = req.files.photo;
            const url = '/images' + file;
            await file.mv('../public/uploads' + url, (err)=>{
                if(err){
                    res.json({msg:'erreur to uploaded image'})
                }
                res.json({msg:"image uploaded"})
            })
       
        
        let created = formatDate('yyyy-MM-dd hh:mm:ss', new Date());

        const newUser = await new userSchema({
            username, 
            email, 
            phone, 
            password, 
            photo: file,
            isAdmin,
            created:created,
            modified: created
        })
        bcrypt.genSalt(10, (err,salt)=>{
            bcrypt.hash(password,salt,(err,hash)=>{
                if(err){
                    res.status(503).json({
                        status: 503,
                        msg:err
                    });
                    return;
                }
                newUser.password = hash
                newUser.save((err, user)=>{
                    if(err){
                        res.status(503).json({
                            status:503,
                            msg:err
                        });
                        return;
                    }
                    res.status(200).json({
                        status: 200,
                        msg: 'Enregistrement avec succcess', 
                        user
                    })
                })
            })
        })
    },
    getUser :async (req,res)=>{
        const data = await userSchema.find();
        if(data){
            return res.status(200).json({
                status: 200,
                msg: "la liste des users: ",
                data
            })
        }
        res.status(400).json({
            status: 400,
            msg: 'Erreur lors de chargement de la liste des users'
        })
    }
}
export default userCtrl;