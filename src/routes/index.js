import express from 'express';
import userRoute from './userRoute';

const routes = express.Router();

routes.use('/user/login', userRoute);


export default routes;