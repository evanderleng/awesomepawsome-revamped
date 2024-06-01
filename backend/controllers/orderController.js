
const Order = require('../models/Order.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookie = require('cookie');



const confirmOrder = async (req, res) => {
    try{

console.log("??: "+req.body.order_list[0])
console.log("prod id: "+req.body.order_list[0].product_id)
console.log("qty: "+req.body.order_list[0].quantity)

        const order = await Order.create({
            "user_id": req.user._id,
            "order_list": req.body.order_list
        })

        return res.status(201).json({order_id: order._id, order_list: order.order_list, message: "Order success!"})
    } catch (err) {
        return res.status(500).json({message: err.message});
    }
}

module.exports = {confirmOrder}