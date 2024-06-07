
const Cart = require('../models/Cart.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookie = require('cookie');

const hasCart = async (req, res) => { //checks if user has any item in cart
    try{
        let cart = await Cart.findOne({ user_id: req.user });

        if (cart && cart_list.length) {
            return res.status(200).json({cart: true})
        }
        return res.status(200).json({cart: false})
    } catch (err) {
        return res.status(500).json({message: err.message});
    }
}


const addToCart = async (req, res) => { //todo
    try{
        /*let cart = await Cart.findOne({ user_id: req.user });

        if (cart && cart_list.length) {
            return res.status(200).json({cart: true})
        }
        return res.status(200).json({cart: false})*/
    } catch (err) {
        return res.status(500).json({message: err.message});
    }
}


module.exports = {hasCart}