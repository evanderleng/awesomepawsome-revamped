const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    brand: {type: String, required: true, index: true, unique:true},
    name: {type: String, required: true},
    copy: {type: String},
    weight: {type: String},
    price: {type: Number, required: true},
    animal: {type: String, required: true},
    rating: {type: Number, default: 0},
    ratingCount: {type: Number, default: 0}
},
{timestamps: true}
);

module.exports = mongoose.model("Product", productSchema)
