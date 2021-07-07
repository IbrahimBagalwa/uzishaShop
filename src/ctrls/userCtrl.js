import userSchema from '../models/userModel';
// import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { generatorToken, getToken } from '../middlewares/util';
import formatDate from 'date-format';
import base64ToImage from 'base64-to-image';
import { hash } from 'bcrypt';
import formidable from 'formidable';

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
    userRegister: async (req, res) =>{
        const form = new formidable.IncomingForm({ multiples:false});
        form.parse(req,(err,fields, files)=>{
            if(err){
                next(err);
                return;
            }else{
                const toPath= ( !files['photo']['nom'] ? files['photo']['nom']:'default.jpg');
                const {username, email, phone, password, isAdmin} = fields;
                let photoName = toPath;
                let created = formatDate('yyy-MM-dd hh:mm:ss', new Date());
                let date = formatDate('yyy-mm-dd-hh-MM-ss', new Date());
                if (photo){
                    let token = await generatorToken();
                    let imageName = token + '-' + date;
                    photoName = imageName + '.jpg';

                    const base64Str = photo;
                    const pathLink = path.join(__dirname, '../public/uploads/images');
                    const optionalObj = {'fileName': imageName, 'type': 'jpg'};

                    var imageInfo = await base64ToImage(base64Str, pathLink, optionalObj);
                    if(imageInfo){
                        console.log('photo uploaded');
                    }else{
                        console.log('Error photo Upload')
                    }
                }
            const newUser = await new userSchema({
                username,
                email,
                phone,
                activated : 1,
                password,
                isAdmin,
                photo : photoName,
                created: created,
                modified: created
            });
            bcrypt.genSalt(10, (err, salt)=>{
                bcrypt.hash(password,hash, (err, salt)=>{
                    if(err){
                        return res.status(503).json({
                            status: 503,
                            msg: err
                        })
                    }
                    newUser.password - hash;
                    newUser.save((err, user)=>{
                        if(err){
                            return res.status(503).json({
                                status: 503,
                                msg: "impossible d'enregistre cet user",err
                            })
                        }
                        res.status(200).json({
                            status: 200,
                            msg: 'Enregistrement avec success'
                        })
                    })
                })
            })
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