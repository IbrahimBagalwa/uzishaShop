import formidable from 'formidable';
import upload from 'express-fileupload';
import hlp from './util';


const onUploadFiles = async (req,res)=>{
    const form = new formidable.IncomingForm();
    form.parse(req);
    form.on('fileBegin', (nom,file)=>{
        file.path = __dirname + '../public/uploads/images/' + file.nom
    });
    form.on('file', (nom, file)=>{
        return res.status(200).json({
            status: 200, 
            msg:'photo uploaded'
        })
    });
   
}
const storage = async (req,res)=>{
    let file = req.files.photo;
    let date = formatDate('yyyy-mm-dd-hh-MM-ss', new Date());
    let fileName = file.name + date;
    file.mv('../public/uploads/images' + fileName, (err,res)=>{
        if(err){
            res.json(err)
        }else{
            res.status(200).json({status: 200, msg:'photo uploaded'});
        }
    })
}
const fileFilter = (req,file,cb)=>{
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg'){
        cb(null,true);
    }else{
        cb(nul,false)
    }
}
const fileUpload = upload({
    fileFilter:fileFilter,
    limits:{
        fileSize: 1024 * 1024 * 20
    },
    storage:storage
})
export {onUploadFiles, fileUpload}
