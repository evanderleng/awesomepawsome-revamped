const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    user_id: {type: mongoose.Schema.Types.ObjectId, required: true},
    product_id: {type: mongoose.Schema.Types.ObjectId, required: true},
    rating: {type: BigInt, required: true},
    comment: {type: String}
},
{timestamps: true}
);

module.exports = mongoose.model("Review", reviewSchema)
