import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const getToken = (user)=>{
    return jwt.sign({
        _id : user._id,
        email: user.email,
        phone:user.phone,
        isAdmin:user.isAdmin
    },
    process.env.ACCESS_KEY,
    {
        expiresIn:process.env.EXPIRE_TOKEN
    })
}

export {
    getToken
}