
const Product = require("../models/Product")


const getProduct = async (req, res)=>{
    try{

        console.log("user: "+req.user)

        //const {x, x} = req.body;
        let product = await Product.find(req.body);

        if (product) {
            return res.json(product)
        } 
    } catch (err) {
        return res.status(500).json({message: err.message});
    }
}

module.exports = {getProduct}