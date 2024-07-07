
const Review = require("../models/Review")
const Order = require("../models/Order")
const Product = require("../models/Product")
const mongoose = require('mongoose');
const escape = require('escape-html');


const getReview = async (req, res) => {
    try {
        const product_id = req.query.product_id;

        const review = await Review.aggregate([
            { 
                $match: {
                    product_id: new mongoose.Types.ObjectId(product_id)
                }
            },
            { 
                $lookup: {
                    from: "users",
                    localField: "user_id",
                    foreignField: "_id",
                    as: "user"
                }
            },
            { 
                $project: {
                    "product_id": 1,
                    "username": {"$first": "$user.username"},
                    "avatar": {"$first": "$user.avatar"},
                    "rating": 1,
                    "comment": 1,
                    "createdAt": 1,
                    "updatedAt": 1
                }
            }
        ]);

        if (review.length > 0) {
            review.forEach((item) => {
                item.product_id = escape(item.product_id)
                item.username = escape(item.username)
                item.avatar = escape(item.avatar)
                item.rating = escape(item.rating)
                item.comment = escape(item.comment)
                item.createdAt = escape(item.createdAt)
                item.updatedAt = escape(item.updatedAt)
            })

            return res.status(200).json(review);
        } else {
            return res.status(200).json({message: "No reviews yet..."});
        }
    } catch (err) {
        return res.status(500).json({message: "Internal Error"});
    }
};


const addReview = async (req, res) => {
    try {
        const { product_id, rating, comment } = req.body;

        let hasProduct = false
		let hasReview = true //assume worst

		const order = await Order.find({
            user_id: req.user._id,
			'order_list.product_id': new mongoose.Types.ObjectId(product_id)
        });

		if (order.length > 0){
			hasProduct = true
		} else {
			hasProduct = false
		}

		const review = await Review.find({
            user_id: req.user._id,
			"product_id": new mongoose.Types.ObjectId(product_id)
        });
		if (review.length > 0){
			hasReview = true
		} else {
			hasReview = false
		}

        if (hasProduct == false){
			return res.status(400).json({ message: "Please purchase the product before leaving a review" });
		} else if (hasReview == true){
			return res.status(400).json({ message: "Already left a review for this product." });
		}

        const newReview = await Review.create({
            product_id: new mongoose.Types.ObjectId(product_id),
            user_id: req.user._id,
            rating,
            comment
        });

        if (newReview) {

            const product = await Product.findOne({ //update prod rating
                _id: new mongoose.Types.ObjectId(product_id)
            });

            const newRatingCount = parseFloat(product.ratingCount) + 1
            const newRating = (((product.rating * product.ratingCount) + rating ) / newRatingCount)

            const updateProduct = await Product.updateOne(
                { _id: new mongoose.Types.ObjectId(product_id) },
				{ $set: { rating: newRating, ratingCount: newRatingCount} }
            );

            return res.status(201).json({ message: "Review successfully added!" });
        }
    } catch (err) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
};


module.exports = { getReview, addReview }
