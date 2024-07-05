
const Review = require("../models/Review")
const Order = require("../models/Order")
const mongoose = require('mongoose');
const escape = require('escape-html');


const getReview = async (req, res) => {
    try {
        const product_id = req.query.product_id;
        console.log('Fetching reviews for product_id:', product_id);

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

        console.log('Review query result:', review);

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
        console.error('Error in getReview:', err);
        return res.status(500).json({message: err.message});
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
            return res.status(201).json({ message: "Review successfully added!" });
        }
    } catch (err) {
        console.error("Error adding review:", err);
        return res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
};

const checkOrderReview = async (req, res) => {
    try {
        const orderId = req.params.orderId;

        if (!orderId) {
            return res.status(400).json({ message: "Order ID is required" });
        }

        const review = await Review.findOne({
            order_id: new mongoose.Types.ObjectId(orderId)
        });

        return res.status(200).json({ hasReview: !!review });
    } catch (err) {
        console.error("Error checking order review:", err);
        return res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
};

const checkProductReview = async (req, res) => {
    try {
        const orderId = req.params.orderId;
        const productId = req.params.productId;

        if (!orderId || !productId) {
            return res.status(400).json({ message: "Order ID and Product ID are required" });
        }

        const review = await Review.findOne({
            order_id: new mongoose.Types.ObjectId(orderId),
            product_id: new mongoose.Types.ObjectId(productId)
        });

        return res.status(200).json({ hasReview: !!review });
    } catch (err) {
        console.error("Error checking product review:", err);
        return res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
};

module.exports = { getReview, addReview, checkOrderReview, checkProductReview};
