const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    brand: {type: String, required: true},
    name: {type: String, required: true, unique:true},
    weight: {type: String},
    price: {type: Number, required: true},
    rating: {type: Number, default: 0},
    ratingCount: {type: Number, default: 0},
    description: {type: String},
    ingredients:{type: String},
    breedSize:{type: String},
    ageGroup:{type: String},
    imageURL:{type: String}
},
{timestamps: true}
);

module.exports = mongoose.model("Product", productSchema)
