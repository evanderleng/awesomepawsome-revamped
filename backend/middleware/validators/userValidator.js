const { check, validationResult } = require('express-validator');


const usernameRegex = /^[\w\d]{1,20}$/g //alphanumeric + underscore only, 1-20 characters
const usernameMsg = "Username can only contain alphabets, digits and underscores and have a maximum of 20 characters"

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W)(?!.* )[a-zA-Z\d\W]{8,40}$/g //8+ character, must have 1 lower 1 upper 1 number 1 symbol no space
const passwordMsg = "Password must be 8-40 characters and contain one uppercase, lowercase, digit and symbol"

const resetPasswordTokenRegex = /^[a-fA-F0-9]{40}$/; //hex digits, exact 40 chars
const resetPasswordTokenMessage = "Reset Password token must be a hex string of maximum 40 characters"

const petNameRegex = /^[a-zA-Z]{1,20}$/g //only alphabets, max 20 char
const petNameMsg = "Pet name can only contain alphabets and have a maximum of 20 characters"

const petAgeRegex = /^\d{1,2}$/g //only numbers (maybe add lookahead for leading zeros)
const petAgeMsg = "Invalid Age!"

const checkAddUserReq = [
	check('username', usernameMsg).matches(usernameRegex).notEmpty(),
	check('password', passwordMsg).matches(passwordRegex).notEmpty(),
	check('email', "Email is required").notEmpty().isEmail()
]

const checkLoginReq = [
	check('username', "Username is required").notEmpty().isLength({ min: 1, max: 20 }),
	check('password', "Password is required").notEmpty().isLength({ min: 1, max: 40 })
]

const checkResetPasswordTokenReq = [
	check('token', resetPasswordTokenMessage).matches(resetPasswordTokenRegex).notEmpty()
]

const checkEditProfileReq = [ //untested, to test and integrate
	check('username', usernameMsg).matches(usernameRegex),
	check('email', "Email is required").isEmail(),
	check('address').isLength({ min: 1, max: 100 })
]

const checkEditPetReq = [ //partially tested...
	check('petDetails.petName', petNameMsg).matches(petNameRegex),
	//check('petDetails.petAge', petAgeMsg).matches(petAgeRegex), //wrong
	check('petDetails.petSize').isLength({ min: 1, max: 100 }),
	check('petDetails.petBreed').isLength({ min: 1, max: 100 }),
]

module.exports = { checkAddUserReq, checkLoginReq, checkResetPasswordTokenReq, checkEditProfileReq, checkEditPetReq };