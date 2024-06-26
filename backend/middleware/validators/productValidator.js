const {check, validationResult} = require('express-validator');


const priceRegex = /^\d+(?:\.\d{2})?$/g
const priceMsg = "Not a valid price"


const weightRegex = /^\d+(?:\.\d{2})?$/g 
const weightMsg = "Not a valid weight"

const checkAddProductReq = [
	check('brand').notEmpty(),
	check('name').notEmpty(),
	check('price', priceMsg).matches(priceRegex).notEmpty(),
	check('animal').notEmpty(),
	//check('weight', weightMsg).matches(weightRegex),
]


module.exports = {checkAddProductReq};