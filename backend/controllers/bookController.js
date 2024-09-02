const Review = require("../models/Review")
const Order = require("../models/Order")
const Product = require("../models/Product")
const Book = require("../models/Book")
const mongoose = require('mongoose');
const escape = require('escape-html');



const getBook = async (req, res) => {
    try {

        let { page } = req.params;
        page = page - 1 //undo zero indexing

        const itemsPerPage = 10

        const book = await Book.aggregate([
            { 
                $sort: {
                    "createdAt": -1 
                }
            },
            { $skip: itemsPerPage * page },
            { $limit: itemsPerPage },
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
                    "_id": 0,
                    "username": {"$first": "$user.username"},
                    "avatar": {"$first": "$user.avatar"},
                    "message": 1,
                    "createdAt": 1
                }
            }

        ]);

        if (book.length > 0) {
            book.forEach((item) => {
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
