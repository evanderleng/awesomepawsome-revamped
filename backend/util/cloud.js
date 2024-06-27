const cloudinary = require('cloudinary')

const cloudinary_func = () => {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    })
    return cloudinary
}


module.exports = {cloudinary_func}