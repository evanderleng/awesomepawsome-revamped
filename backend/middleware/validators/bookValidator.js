const {check, validationResult} = require('express-validator');

const checkAddBookReq = [
	check('message', "Comment must be between 1-100 characters").notEmpty().isLength({ min:1, max:100 }), //all language allowed, sanitise it
]


module.exports = {checkAddBookReq};