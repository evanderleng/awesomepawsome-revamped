const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user_id: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    order_list: [{
        product_id: {type: mongoose.Schema.Types.ObjectId, ref:"Product", required: true},
        quantity: {type: Number, required: true}
    }],
    subscription: Boolean,
    fulfilled: Boolean,
    cancelled: Date
},
{timestamps: true}
);

module.exports = mongoose.model("Order", orderSchema)
