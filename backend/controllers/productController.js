
const Product = require("../models/Product")


const getProduct = async (req, res)=>{
    try{
        const {username, password} = req.body;
        let product = await Product.find();

        if (product) {
            return res.json(product)
        } 
    } catch (err) {
        return res.status(500).json({message: err.message});
    }
}

module.exports = {getProduct}