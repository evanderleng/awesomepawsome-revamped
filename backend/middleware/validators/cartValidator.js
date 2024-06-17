const {check, validationResult} = require('express-validator');

const mongoidRegex = /^[\da-f]{24}$/g
const mongoidMsg = "Not a valid ID"

const zeroAndAboveIntRegex = /^[0-9]+$/g 
const zeroAndAboveIntMsg = "Number must be an integer greater than or equal to zero"

const checkUpdateCartReq = [
	//check('comment', "Comment must be alphanumeric"), //no check for comment. all languages allowed. output will be sanitied
	check('quantity', zeroAndAboveIntMsg).matches(zeroAndAboveIntRegex).notEmpty(),
	check('product_id', mongoidMsg).matches(mongoidRegex).notEmpty()
]


module.exports = {checkUpdateCartReq};