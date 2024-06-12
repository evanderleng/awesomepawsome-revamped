const Order = require('../models/Order.js');

const confirmOrder = async (req, res) => {
    try{
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