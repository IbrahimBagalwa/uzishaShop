import userSchema from '../models/userModel';
// import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { generatorToken, getToken } from '../middlewares/util';
import formatDate from 'date-format';
import base64ToImage from 'base64-to-image';
import { hash } from 'bcrypt';
import formidable from 'formidable';
import bcrypt from 'bcrypt'

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
    onUploadFiles: async (req,res)=>{
        const form = new formidable.IncomingForm();
        form.parse(req);
        form.on('fileBegin', (nom,file)=>{
            file.path = __dirname + '../public/uploads/images/' + file.nom
        });
        form.on('file', (nom, file)=>{
            return res.status(200).json({
                status: 200, 
                msg:'photo uploaded'
            })
        });
        process.on('uncaughtException',err =>{
            return res.status(500).json({
                status:500,
                msg: "Error to upload photo",err
            })
        })
    },
    userRegister : (req,res)=>{
        const form = new formidable.IncomingForm({ multiples:false});
        form.parse(req,(err,fields, files)=>{
            if(err){
                res.json(err)
            }else{
                const pathLink= ( !files['photo']['nom'] ? files['photo']['nom']:'default.jpg');
                const {username, email, phone,password,isAdmin,photo} = fields;
                // let pswd =  bcrypt.hash(password, process.env.KEY_LENGTH);
                let created = formatDate('yyy-MM-dd hh:mm:ss', new Date());
                if(username !==undefined && email !==undefined && phone !==undefined && password !==undefined && isAdmin !==undefined){
                    const newUser = new userSchema({
                    username,
                    email,
                    phone,
                    password,
                    isAdmin,
                    photo :pathLink,
                    created: created,
                    modified: created
                });
                bcrypt.genSalt(10,(err,salt)=>{
                    bcrypt.hash(password,salt,(err,hash)=>{
                        if(err){
                            res.status(503).json({msg:err});
                            return;
                        }
                        newUser.password = hash
                        newUser.save((err,user)=>{
                            if(err)
                            {
                                res.status(503).json({status:503,msg:err});
                                return;
                            }
                            res.status(200).json({status:200,msg:'Enregistrement reussi', user})
                        })
                        console.log(username,email,password,phone,phone)
                    })
                })
                }else {
                    console.log("-----------------------------",email, username, password,phone,photo,isAdmin, "----------------------")
                    return res.status(405).json({
                        status: 405,
                        mssg: 'Veillez completez tous les champs',
                        
                    })
            }
                   
        }
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