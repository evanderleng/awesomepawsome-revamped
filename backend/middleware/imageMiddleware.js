const multer = require('multer')
const {cloudinary_func} = require('../util/cloud.js');
const path = require('path')
const fs = require('fs')


const storage = multer.diskStorage({
    destination: function (req,file,cb) {
        process.env.NODE_ENV == "development" 
            ? filePath = "./tmp"
            : filePath = "/tmp";
        cb(null, filePath);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
})

function fileFilter (req, file, cb) {
    let extName = path.extname(file.originalname);
    let ext = extName.substring(1).toLowerCase();
    if (ext !== "png" && ext !== "jpg" && ext !== "jpeg") {
        return cb("Only png, jpg, jpeg are accepted", false);
    }
    cb(null, true);  
}

function checktmp () {
    fs.mkdir('./tmp', { recursive: true }, (err) => {
        if (err) throw err;
    });
}

const uploadToLocal = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { 
        files: 1,
        fileSize: 3 * 1000000,//limit to 3MB
    }
});

const uploadProduct = async (file, image_name) => {
    try {
        const cloudinary = cloudinary_func();
        const upload = await cloudinary.v2.uploader.upload(file.path, {folder:'products', resource_type: 'image', public_id: image_name, overwrite: true});
        return upload.secure_url;
    } catch (error) {
        console.log(error)
    }
};

const uploadAvatar = async (file, image_name) => {
    try {
        const cloudinary = cloudinary_func();
        console.log("img: "+image_name)
        const upload = await cloudinary.v2.uploader.upload(file.path, {folder:'avatars', resource_type: 'image', public_id: image_name, overwrite: true, height:500, width:500, crop:'thumb'});
        return upload.secure_url;
    } catch (error) {
        throw error;
    }
};
  



module.exports = {uploadToLocal, uploadProduct, uploadAvatar,checktmp}