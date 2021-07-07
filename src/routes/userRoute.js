import express from 'express';
import userCtrl from '../ctrls/userCtrl';
import {onUploadFiles} from '../middlewares/onUploadFile';

const route = express.Router()

route.post('/login', userCtrl.userLogin)
     .post('/register',onUploadFiles, userCtrl.userRegister)
     .get('/views',userCtrl.getUser)

export default route;