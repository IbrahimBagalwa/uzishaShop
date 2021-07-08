import express from 'express';
import userCtrl from '../ctrls/userCtrl';
// import {onUploadFiles} from '../middlewares/onUploadFile';

const route = express.Router()

route.post('/login', userCtrl.userLogin)
     .post('/register',[userCtrl.userRegister, userCtrl.onUploadFiles])
     .get('/views',userCtrl.getUser)

export default route;