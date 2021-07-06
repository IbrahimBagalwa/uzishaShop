 import userSchema from '../models/userModel';
 import bcrypt from 'bcrypt';
 import dotenv from 'dotenv';
 import { generatorToken, getToken } from '../middlewares/util';
import user from 'c:/users/abraham/desktop/api-m-auto/models/user';
import formatDate from 'date-format';
import base64ToImage from 'base64-to-image';
import c from 'config';
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
    },
    userRegister: async (req, res) =>{
        const {username, email, phone, photo, password, isAdmin} = req.body;
        password = await bcrypt.hash(password, 10);
        let photoName = 'defaul.jpg';
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
    }
}