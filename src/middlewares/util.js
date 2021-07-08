import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import randomstring from 'randomstring'
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
const generatorToken = async ()=>{
    let token = randomstring.generate(20);
    return token
}
export {
    getToken,
    generatorToken
}