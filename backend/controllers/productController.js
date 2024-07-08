const multer = require('multer');
const Product = require("../models/Product");
const User = require("../models/User");
const { uploadToLocal, uploadProduct } = require("../middleware/imageMiddleware.js");
const { checkCSRF } = require('../middleware/csrfMiddleware.js');
const { checkAddProductReq }  = require('../middleware/validators/productValidator.js');
const { checkValid }  = require('../middleware/validators/validatorMiddleware.js');
const escape = require('escape-html');
const mongoSanitize = require('express-mongo-sanitize');

const getProductById = async (req, res) => {
    try {
        const { product_id } = req.params;
        let product = await Product.findOne( { _id: product_id } );

        if (product) {
            product._id = escape(product._id)
            product.name = escape(product.name)
            product.brand = escape(product.brand)
            product.price = escape(product.price)
            product.weight = escape(product.weight)
            product.rating = escape(product.rating)
            product.ratingCount = escape(product.ratingCount)
            product.ingredients = escape(product.ingredients)
            product.description = escape(product.description)
            product.petSize = escape(product.petSize)
            product.petAge = escape(product.petAge)
            product.imageURL = escape(product.imageURL)

            return res.status(200).json(product);
        } else {
            return res.status(404).json({ message: "Product not found" });
        }
    } catch (err) {
        return res.status(500).json({ message: "Internal Error" });
    }
};

const getProduct = async (req, res) => {
    try {
        let products = await Product.find();
        if (products.length > 0) {

            products.forEach((item) => {
                item._id = escape(item._id)
                item.name = escape(item.name)
                item.brand = escape(item.brand)
                item.price = escape(item.price)
                item.weight = escape(item.weight)
                item.rating = escape(item.rating)
                item.ratingCount = escape(item.ratingCount)
                item.ingredients = escape(item.ingredients)
                item.description = escape(item.description)
                item.petSize = escape(item.petSize)
                item.petAge = escape(item.petAge)
                item.imageURL = escape(item.imageURL)
            })


            return res.status(200).json(products);
        } else {
            return res.status(404).json({ message: "No products found" });
        }
    } catch (err) {
        return res.status(500).json({ message: "Internal Error" });
    }
};

const getRecommended = async (req, res) => {
    try {
        const user_id = req.user._id

        let user = await User.findOne({ _id: user_id });

        if (user.petDetails) {
            if (user.petDetails.petSize || user.petDetails.petAge){
                let product = await Product.findOne({
                    $or: [{ petSize: user.petDetails.petSize }, { petAge: user.petDetails.petAge }]
                });

                if (product) {
                    product._id = escape(product._id)
                    product.name = escape(product.name)
                    product.brand = escape(product.brand)
                    product.price = escape(product.price)
                    product.weight = escape(product.weight)
                    product.rating = escape(product.rating)
                    product.ratingCount = escape(product.ratingCount)
                    product.ingredients = escape(product.ingredients)
                    product.description = escape(product.description)
                    if (product.petSize) {product.petSize = escape(product.petSize);} else {product.petSize = ""}
                    if (product.petAge) {product.petAge = escape(product.petAge);} else {product.petAge = ""}
                    product.imageURL = escape(product.imageURL)

                    return res.status(200).json(product);
                }
            }
        } else {
            return res.status(404).json({ message: "No recommended products found" });
        }
    } catch (err) {
        return res.status(500).json({ message: "Internal Error" });
    }
};

const addProduct = async (req, res) => {
    let cloudImgUrl;
    const upload = uploadToLocal.single('product_image');

    upload(req, res, async function (err) {
        if (err) {
            console.log(err);
            return res.status(500).json({ message: err.message });
        }
    
        checkCSRF(req, res, async function (err) {

            for (const validation of checkAddProductReq) { //integrated validation
                const errors = await validation.run(req);
                if (!errors.isEmpty()) {
                    return res.status(400).json({
                        message: errors.array()[0].msg, 
                        path: errors.array()[0].path
                    });
                }
            }

            try {
                mongoSanitize.sanitize(req.body);

                const { brand, name, weight, price, description, ingredients, petSize, petAge } = req.body;

                let checkProduct = await Product.findOne({ name });
                if (checkProduct) {
                    return res.status(400).json({ message: "Product name is already taken." });
                } 

                if (req.file) {
                    cloudImgUrl = await uploadProduct(req.file, name);
                } else {
                    return res.status(500).json({ message: "Please upload a valid image file" });
                }

                const product = await Product.create({
                    brand,
                    name,
                    weight,
                    price,
                    rating: 0,
                    ratingCount:0,
                    description,
                    ingredients, 
                    petSize,
                    petAge,
                    imageURL: cloudImgUrl
                });

                if (product) {
                    return res.status(200).json({ message: "Success" });
                }
            } catch (err) {
                return res.status(500).json({ message: "Internal Error" });
            }
        });
    });

};

module.exports = { getProduct, getProductById, addProduct, getRecommended };
