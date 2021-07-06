import mongoose from "../cnx/database";

const userSchema = mongoose.Schema({
    created:{
        type: Date,
        default:Date.now(),
        required: true
    },
    modified:{
        type:Date,
        default:Date.now(),
        required:true
    },
    deleted:{
        type:Date,
        default:Date.now(),
        required:false
    },
    nom:{
        type:String,
        required:true
    },
    prenom:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    photo:{
        type:String,
        required:true
    },
    isAdmin:{
        type:Boolean,
        required:true
    }

})
module.exports = mongoose.model('users',userSchema)