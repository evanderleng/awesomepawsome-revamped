
const Review = require("../models/Review")
const Order = require("../models/Order")
const Product = require("../models/Product")
const Book = require("../models/Book")
const mongoose = require('mongoose');
const escape = require('escape-html');



const getBook = async (req, res) => {
    try {
        const book = await Book.aggregate([
            { 
                $sort: {
                    "createdAt": -1 
                }
            },
            { $limit: 9 },
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
                    "_id": 1,
                    "user_id": 1,
                    "username": {"$first": "$user.username"},
                    "avatar": {"$first": "$user.avatar"},
                    "message": 1,
                    "createdAt": 1
                }
            }

        ]);

        if (book.length > 0) {
            book.forEach((item) => {
                item._id = escape(item._id)
                item.user_id = escape(item.user_id)
                item.username = escape(item.username)
                item.avatar = escape(item.avatar)
                item.message = escape(item.message)
                item.createdAt = escape(item.createdAt)
            })

            return res.status(200).json(book);
        } else {
            return res.status(200).json(book);
        }
    } catch (err) {
        console.log(err)
        return res.status(500).json({message: "Internal Error"});
    }
};


const addBook = async (req, res) => {
    try {
        let { message } = req.body;

        message = escape(message)

        const book = await Book.create({
            user_id: new mongoose.Types.ObjectId(req.user._id),
            message
        });
        return res.status(201).json({ message: "Message added!" });
    } catch (err) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
};


module.exports = { getBook, addBook}
