const Cart = require('../models/Cart.js');
const mongoose = require('mongoose');

const hasCart = async (req, res) => { //checks if user has any item in cart
    try{
        let cart = await Cart.findOne({ user_id: req.user._id });

        if (cart && cart.cart_list.length) {
            return res.status(200).json({cart: true})
        }
        return res.status(200).json({cart: false})
    } catch (err) {
        return res.status(500).json({message: err.message});
    }
}

const getCart = async (req, res) => {
    try{
        let cart = await Cart.findOne({ user_id: req.user._id });
        console.log(cart)
        if (cart && cart.cart_list.length >= 1) {
            //return res.status(200).json(cart.cart_list)
            console.log(typeof req.user)
            const cart2 = await Cart.aggregate([
                { $match : 
                    {
                        "user_id": new mongoose.Types.ObjectId(req.user._id)
                    }
                },
                { $unwind: "$cart_list"},
                { $lookup: 
                    {
                        from: "products",
                        localField: "cart_list.product_id",
                        foreignField: "_id",
                        as: "product"
                    }
                },
                { $project:
                    {
                        "_id": 0,
                        "cart_object_id": "$cart_list._id",
                        "product_id": "$cart_list.product_id",
                        "product_name": {"$first": "$product.name"},
                        "quantity": "$cart_list.quantity",
                        "createdAt": 1,
                        "updatedAt": 1
                    }
                }
            ])
            return res.status(200).json(cart2)
        } else {
            return res.status(200).json({message: "cart is empty"})
        }
    } catch (err) {
        console.log(err)
        return res.status(500).json({message: err.message});
    }
}

const updateCart = async (req, res) => { //inputs: {prod_id, new_qty} ONE item type only per api call
    try{
        let cart = await Cart.findOne({ user_id: req.user._id });

        if (cart == undefined) { //add new document to cart collection
            cart = await Cart.create({
                user_id: req.user, cart_list: [{product_id: req.body.product_id, quantity: req.body.quantity}]
            })
        } else if (cart.cart_list.filter(item => item.product_id == req.body.product_id).length == 1){     //if product is already in cart, simply update
            cart = await Cart.findOne({ user_id: req.user }).then(doc => {
                item = doc.cart_list.find( (item) => item.product_id == req.body.product_id )
                console.log(item)
                item["quantity"] = req.body.quantity
                doc.save();
            })
        } else { //add new prod to existing cart
            cart = await Cart.findOneAndUpdate(
                { user_id: req.user },
                { $push: { cart_list: { product_id: req.body.product_id, quantity: req.body.quantity } } }
            )
        }
        return res.status(200).json({message: "Cart updated!"})
    } catch (err) {
        return res.status(500).json({message: err.message});
    }
}

/*const addToCart = async (req, res) => { //deprecated, use updatecart instead
    try{
        let cart = await Cart.findOne({ user_id: req.user });

        console.log("test!!")
        if (cart == undefined) { //add new document to cart collection
            cart = await Cart.create({
                user_id: req.user, cart_list: [{product_id: req.body.product_id, quantity: req.body.quantity}]
            })
        } else if (cart.cart_list.filter(item => item.product_id == req.body.product_id).length = 1){     //if product is already in cart, add to existing qty
            const existingProduct = cart.cart_list.find( item => item.product_id == req.body.product_id)
            const newQuantity = existingProduct.quantity + req.body.quantity

            cart = await Cart.findOne({ user_id: req.user }).then(doc => {
                item = doc.cart_list.find( (item) => item.product_id == req.body.product_id )
                item["quantity"] = newQuantity
                doc.save();
            })
        }
        return res.status(200).json({message:"added!"})
    } catch (err) {
        return res.status(500).json({message: err.message});
    }
}*/


module.exports = {hasCart, getCart, updateCart}