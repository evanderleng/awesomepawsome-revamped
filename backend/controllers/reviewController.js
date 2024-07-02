
const Review = require("../models/Review")
const Order = require("../models/Order")
const mongoose = require('mongoose');
const escape = require('escape-html');


const getReview = async (req, res) => {
    try {
        const productId = req.query.product_id;
        console.log('Fetching reviews for product_id:', productId);

        const reviews = await Review.aggregate([
            { 
                $match: {
                    product_id: new mongoose.Types.ObjectId(productId)
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
                    "product_id": { $toString: "$product_id" },
                    "user_id": { $toString: "$user_id" },
                    "username": {"$first": "$user.username"},
                    "avatar": {"$first": "$user.avatar"},
                    "rating": 1,
                    "comment": 1,
                    "createdAt": 1,
                    "updatedAt": 1
                }
            }
        ]);

        console.log('Review query result:', reviews);

        if (reviews.length) {
            reviews.forEach((item) => {
                item.comment = escape(item.comment);
                item.username = escape(item.username);
                item.product_id = escape(item.product_id);
                item.avatar = escape(item.avatar);
                item.rating = escape(item.rating.toString());
                item.createdAt = escape(item.createdAt.toString());
                item.updatedAt = escape(item.updatedAt.toString());
            });

            return res.status(200).json(reviews);
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
        const { product_id, order_id, rating, comment } = req.body;
        console.log('Adding review for product_id:', product_id, 'order_id:', order_id);

        // Validate input
        if (!product_id || !order_id || !rating || !comment) {
            return res.status(400).json({ message: "Missing required fields: product_id, order_id, rating, or comment" });
        }

        // Check if user has purchased the product in this specific order
        const order = await Order.findOne({
            _id: new mongoose.Types.ObjectId(order_id),
            user_id: req.user._id,
            "order_list.product_id": new mongoose.Types.ObjectId(product_id)
        });
        
        if (!order) {
            return res.status(400).json({ message: "No matching order found for this product and user" });
        }

        // Check if a review already exists for this order
        const existingReview = await Review.findOne({
            order_id: new mongoose.Types.ObjectId(order_id)
        });
        
        if (existingReview) {
            return res.status(400).json({ message: "A review already exists for this order." });
        }

        // Create new review
        const review = await Review.create({
            product_id: new mongoose.Types.ObjectId(product_id),
            user_id: req.user._id,
            order_id: new mongoose.Types.ObjectId(order_id),
            rating,
            comment
        });

        console.log('New review created:', review);

        if (review) {
            const plainReview = review.toObject();
            plainReview._id = plainReview._id.toString();
            plainReview.product_id = plainReview.product_id.toString();
            plainReview.user_id = plainReview.user_id.toString();
            plainReview.order_id = plainReview.order_id.toString();

            return res.status(201).json({ message: "Review successfully added!", review: plainReview });
        } else {
            return res.status(400).json({ message: "Failed to add review. Please try again later." });
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
