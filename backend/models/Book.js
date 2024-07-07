const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    user_id: {type: mongoose.Schema.Types.ObjectId, required: true},
    message: {type: String, required: true},
},
{timestamps: true}
);

module.exports = mongoose.model("Book", bookSchema)
