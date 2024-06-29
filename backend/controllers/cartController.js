const Cart = require('../models/Cart.js');
const mongoose = require('mongoose');
const escape = require('escape-html');

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
        if (cart && cart.cart_list.length >= 1) {
            const cart = await Cart.aggregate([
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
                        "price": { "$first": "$product.price" },
                        "quantity": "$cart_list.quantity",
                        "createdAt": 1,
                        "updatedAt": 1
                    }
                }
            ])

            await cart.forEach((item) => { //escaping, maybe put in middleware?
                item.cart_object_id = escape(item.cart_object_id)
                item.product_id = escape(item.product_id)
                item.product_name = escape(item.product_name)
                item.price = escape(item.price)
                item.quantity = escape(item.quantity)
            })

            return res.status(200).json(cart)
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
        const {quantity, product_id} = req.body
        
        let cart = await Cart.findOne({ user_id: req.user._id });

        if (cart == undefined) { //add new document to cart collection if none
            cart = await Cart.create({
                user_id: req.user._id, cart_list: [{product_id, quantity}]
            })
        } else if (cart.cart_list.filter(item => item.product_id == product_id).length == 1){     //if product is already in cart, simply update

            if (quantity == 0){
                cart = await Cart.findOneAndUpdate(
                    { "user_id": req.user._id },
                    { $pull : { "cart_list": {"product_id": product_id } } },
                    { new: true }
                )

                if (cart.cart_list.length == 0){ //remove doc if cart empty
                    cart = await Cart.deleteOne(
                        { "user_id": req.user._id }
                    )
                }

            } else {
                cart = await Cart.updateOne( 
                    { "user_id": req.user._id},
                    { $set : { "cart_list.$[item].quantity": quantity } },
                    { arrayFilters: [ { "item.product_id": product_id } ]
                })
            }

        } else { //add new prod to existing cart
            cart = await Cart.updateOne(
                { user_id: req.user },
                { $push: { cart_list: { product_id, quantity } } }
            )
        }
        return res.status(200).json({message: "Cart updated!"})
    } catch (err) {
        return res.status(500).json({message: err.message});
    }
}


module.exports = {hasCart, getCart, updateCart}