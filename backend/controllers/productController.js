
const Product = require("../models/Product")


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
        const {brand, name, copy, weight, price, animal, rating} = req.body;
        product = await Product.create({
            brand, name, copy, weight, price, animal, rating
        })

        if (product) {
            return res.status(200).json({message: "Success"})
        } 

    } catch (err) {
        return res.status(500).json({message: err.message});
    }
}


module.exports = {getProduct,addProduct}