import express from 'express';
import userRoute from './userRoute';

const router = express.Router();

router.use('/user/login', userRoute);


export default router;