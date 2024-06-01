const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user_id: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    /*rder_list: {type: Array, required: true, fieldhs: [
        {product_id: mongoose.Schema.Types.ObjectId, ref: "Product"}, {quantity: Number}
    ]}*/
    order_list: [
        {product_id: {type: mongoose.Schema.Types.ObjectId}},
        {quantity: {type: Number, required: true}}
    ]
},
{timestamps: true}
);

module.exports = mongoose.model("Order", orderSchema)
