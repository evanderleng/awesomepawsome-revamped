const {check, validationResult} = require('express-validator');

const ratingRegex = /^[1-5]$/g
const ratingMsg = "Rating must be between 1-5"

const mongoidRegex = /^[\da-f]{24}$/g
const mongoidMsg = "Not a valid ID"

const checkAddReviewReq = [
	//check('comment', "Comment must be alphanumeric"), //no check for comment. all languages allowed. output will be sanitied
	check('rating', ratingMsg).matches(ratingRegex).notEmpty(),
	check('product_id', mongoidMsg).matches(mongoidRegex).notEmpty()
]


module.exports = {checkAddReviewReq};