
const Review = require("../models/Review")
const mongoose = require('mongoose');
const escape = require('escape-html');


const getReview = async (req, res)=>{
    try{
        const review = await Review.aggregate([
            { $match : 
                {
                    product_id: new mongoose.Types.ObjectId(req.body.product_id)
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


        //let order = await Order.findOne({ user_id: req.user, order_list: { $eleMatch: {product_id} } });
        //console.log(order)

        let review = await Review.findOne({ product_id, user_id: req.user });



        if (review) {
            return res.status(400).json({message: "Review already exists."})
        } else {




            user = await Review.create({
                product_id, user_id: req.user, rating, comment
            })
        }
        return res.status(201).json({message: "Review successfully added!"})
    } catch (err) {
        return res.status(500).json({message: err.message});
    }
}

module.exports = {getReview, addReview}