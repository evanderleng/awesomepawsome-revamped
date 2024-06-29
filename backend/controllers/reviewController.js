
const Review = require("../models/Review")
const Order = require("../models/Order")
const mongoose = require('mongoose');
const escape = require('escape-html');


const getReview = async (req, res)=>{
    try{
        const review = await Review.aggregate([
            { $match : 
                {
                    product_id: new mongoose.Types.ObjectId(req.query.product_id)
                }
            },
            { $lookup: 
                {
                    from: "users",
                    localField: "user_id",
                    foreignField: "_id",
                    as: "user"
                }
            },
            { $project:
                {
                    "product_id": 1,
                    "username": {"$first": "$user.username"},
                    "avatar": {"$first": "$user.avatar"},
                    "rating": 1,
                    "comment": 1,
                    "createdAt": 1,
                    "updatedAt": 1
                }
            }
        ])

        if (review.length) {
            review.forEach((item) => { //escaping, maybe put in middleware?
                item.comment = escape(item.comment)
                item.username = escape(item.username)
                item.product_id = escape(item.product_id)
                item.avatar = escape(item.avatar)
                item.rating = escape(item.rating)
                item.createdAt = escape(item.createdAt)
                item.updatedAt = escape(item.updatedAt)
            })

            return res.status(200).json(review)
        } else {
            return res.status(200).json({message: "No reviews yet..."})
        }
    } catch (err) {
        return res.status(500).json({message: err.message});
    }
}

const addReview = async (req, res)=>{
    try{
        const {product_id, rating, comment} = req.body;

        let order = await Order.findOne({ user_id: req.user._id, "order_list.product_id": new mongoose.Types.ObjectId(product_id) } ); //check if user has purchased product

        if (!order){
            return res.status(400).json({message: "Please buy the product before leaving a review"})
        }

        let review = await Review.findOne({ product_id, user_id: req.user }); //check if review exists

        if (review) {
            return res.status(400).json({message: "Review already exists."})
        } else {
            review = await Review.create({
                product_id, user_id: req.user, rating, comment
            })
            if (review){
                return res.status(201).json({message: "Review successfully added!"})
            }
        }
        return res.status(400).json({message: "An error occurred. Please try again later"})
        
    } catch (err) {
        return res.status(500).json({message: err.message});
    }
}

module.exports = {getReview, addReview}
