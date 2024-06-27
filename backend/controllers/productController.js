const multer = require('multer')
const Product = require("../models/Product")
const {uploadToLocal, uploadProduct} = require("../middleware/imageMiddleware.js")


const getProduct = async (req, res)=>{
    try{

        const {brand, name, copy, weight,price, animal, rating} = req.body;
        let product = await Product.find(req.body);

        if (product) {
            return res.status(200).json(product)
        } 
    } catch (err) {
        return res.status(500).json({message: err.message});
    }
}


const addProduct = async (req, res)=>{
    try{
        let cloudImgUrl;
        const upload = uploadToLocal.single('product_image');

        upload(req, res, async function (err) {
            if (err) {
                console.log(err)
                return res.status(500).json({ message: err.message });
            }

            const {brand, name, weight, price, description, ingedients, breedSize, ageGroup } = req.body;
            if (req.file){
                cloudImgUrl = await uploadProduct(req.file, name);
            } else {
                return res.status(500).json({ message: "Error with uploading file" });
            }

            product = await Product.create({
                brand, name, weight, price, description, ingedients, breedSize, ageGroup, imageURL:cloudImgUrl
            })
    
            if (product) {
                return res.status(200).json({message: "Success"})
            } 

        });
    } catch (err) {
        return res.status(500).json({message: err.message});
    }
}



module.exports = {getProduct, addProduct}