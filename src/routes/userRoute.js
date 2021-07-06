import express from 'express';
import userCtrl from '../ctrls/userCtrl';

const route = express.Router()

route.post('/login', userCtrl.userLogin)
     .post('/register', userCtrl.userRegister);

export default route;