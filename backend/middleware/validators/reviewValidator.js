const {check, validationResult} = require('express-validator');

const ratingRegex = /^[1-5]$/g
const ratingMsg = "Rating must be between 1-5"

const mongoidRegex = /^[\da-f]{24}$/g
const mongoidMsg = "Not a valid ID"

const checkAddReviewReq = [
	check('comment', "Comment must be between 1-500 characters").notEmpty().isLength({ min:1, max:500 }), //no alphanumeric limit check for comment. all languages allowed. output WILL be sanitied MAKE SURE OF THAT
	check('rating', ratingMsg).matches(ratingRegex).notEmpty(),
	check('product_id', mongoidMsg).matches(mongoidRegex).notEmpty()
]

const checkGetReviewReq = [
	check('product_id', mongoidMsg).matches(mongoidRegex).notEmpty()
]

module.exports = {checkAddReviewReq, checkGetReviewReq};