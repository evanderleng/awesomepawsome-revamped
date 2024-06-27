const multer = require('multer')
const {cloudinary_func} = require('../util/cloud.js');
const path = require('path')


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
        return cb(new Error("Only images are accepted"));
    }
    cb(null, true);  
}

const uploadToLocal = multer({
    storage: storage,
    limits: { //limit to 5MB
        fileSize: 5 * 1000000,
    },
    fileFilter: fileFilter
});

const uploadProduct = async (file, image_name) => {
    try {
        const cloudinary = cloudinary_func();
        const upload = await cloudinary.v2.uploader.upload(file.path, {folder:'products', resource_type: 'image', public_id: image_name, overwrite: true});
        return upload.secure_url;
    } catch (error) {
        throw error;
    }
};

const uploadAvatar = async (file, image_name) => {
    try {
        const cloudinary = cloudinary_func();
        const upload = await cloudinary.v2.uploader.upload(file.path, {folder:'avatars', resource_type: 'image', public_id: image_name, overwrite: true, height:500, width:500, crop:'thumb'});
        return upload.secure_url;
    } catch (error) {
        throw error;
    }
};
  



module.exports = {uploadToLocal, uploadAvatar}