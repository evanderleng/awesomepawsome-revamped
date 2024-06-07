
const Review = require("../models/Review")



const getReview = async (req, res)=>{
    try{
        const {product_id} = req.body;

        let review = await Review.find({ product_id });

        if (review) {
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

        let review = await Review.findOne({ product_id, user_id: req.user });

        if (review) {
            return res.status(400).json({message: "Review already exists"})
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