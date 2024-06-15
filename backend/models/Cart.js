const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    user_id: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    cart_list: [{
        product_id: {type: mongoose.Schema.Types.ObjectId, ref:"Product", required: true},
        quantity: {type: Number, validate:{ validator: (input) => input.isInteger(), message: "{VALUE} is not an integer" }, required: true}
    }]
},
{timestamps: true}
);

module.exports = mongoose.model("Cart", cartSchema)
