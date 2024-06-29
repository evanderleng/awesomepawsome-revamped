const {check, validationResult} = require('express-validator');


const priceRegex = /^\d+(?:\.\d{2})?$/g //    /^(?!0+\d+\.\d+)\d+(?:\.\d{2})?$/g   //lookahead regex to prevent leading zeros (untested)
const priceMsg = "Not a valid price"

const weightRegex = /^\d+(?:\.\d{2})?$/g 
const weightMsg = "Not a valid weight"

const checkAddProductReq = [
	check('brand').notEmpty(),
	check('name').notEmpty(),
	check('price', priceMsg).matches(priceRegex).notEmpty(),
	check('ingredients').notEmpty(),
	check('breedSize').notEmpty()
]


module.exports = {checkAddProductReq};