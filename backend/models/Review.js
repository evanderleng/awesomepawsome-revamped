// const mongoose = require('mongoose');

// const reviewSchema = new mongoose.Schema({
//     user_id: {type: mongoose.Schema.Types.ObjectId, required: true},
//     product_id: {type: mongoose.Schema.Types.ObjectId, required: true},
//     rating: {type: BigInt, required: true},
//     comment: {type: String}
// },
// {timestamps: true}
// );

// module.exports = mongoose.model("Review", reviewSchema)

// models/Review.js
const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  order_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  comment: {
    type: String,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Review', ReviewSchema);