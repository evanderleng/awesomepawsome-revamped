const {check, validationResult} = require('express-validator');

const brandRegex = /^[A-Za-z\d ]{1,50}$/g   //alphanumeric + underscore only, 1-50 characters
const brandMsg = "Brand must only contain alphanumeric characters and spaces and be below 1-50 characters"

const nameRegex = /^[A-Za-z\d ]{1,50}$/g   //alphanumeric + underscore only, 1-50 characters
const nameMsg = "Name must only contain alphanumeric characters and spaces and be below 1-50 characters"

const weightRegex = /^(?!^0+\d+(?:\.\d*)?)\d+(?:\.\d{1,2})?$/g //lookahead regex prevents leading zeros for integers AND decimal values, 1-2dp allowed
const weightMsg = "Weight is mandatory and must be at most 2dp"

const priceRegex = /^(?!^0+\d+(?:\.\d*)?)\d+(?:\.\d{2})?$/g //lookahead regex prevents leading zeros for integers AND decimal values
const priceMsg = "Not a valid price"

const descriptionRegex = /^[A-Za-z\d ,.]{1,50}$/g   //alphanumeric + underscore only, 1-50 characters  //description can use this too
const descriptionMsg = "Name must only contain alphanumeric characters, commas and spaces and be 1-50 characters"

const petAgeRegex = /^Puppy$|^Junior$|^Adult$|^Senior$/g 
const petAgeMsg = "Invalid Age!"

const petSizeRegex = /^Small$|^Medium$|^Large$|^Giant$/g 
const petSizeMsg = "Invalid Size!"

const checkAddProductReq = [
	check('brand',brandMsg).matches(brandRegex).notEmpty(),
	check('name',nameMsg).matches(nameRegex).notEmpty(),
	check('weight', weightMsg).matches(weightRegex).notEmpty(),
	check('price', priceMsg).matches(priceRegex).notEmpty(),
	check('description', descriptionMsg).matches(descriptionRegex).notEmpty(),
	check('ingredients', descriptionMsg).matches(descriptionRegex).notEmpty(),
	check('petAge', petAgeMsg).matches(petAgeRegex).notEmpty(),
	check('petSize', petSizeMsg).matches(petSizeRegex).notEmpty()
]


module.exports = {checkAddProductReq};