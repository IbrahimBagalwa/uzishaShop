import formidable from 'formidable';
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
    process.on('uncaughtException',err =>{
        return res.status(500).json({
            status:500,
            msg: "Error to upload photo",err
        })
    })
}

export {onUploadFiles}
