const {check, validationResult} = require('express-validator');


const usernameRegex = /^[\w\d]{1,20}$/g //alphanumeric + underscore only, 1-20 characters
const usernameMsg = "Username can only contain alphabets, digits and underscores and have a maximum of 20 characters"

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W)(?!.* )[a-zA-Z\d\W]{8,40}$/g //8+ character, must have 1 lower 1 upper 1 number 1 symbol no space
const passwordMsg = "Password must be 8-40 characters and contain one uppercase, lowercase, digit and symbol"

const checkAddUserReq = [
	check('username', usernameMsg).matches(usernameRegex).notEmpty(),
	check('password', passwordMsg).matches(passwordRegex).notEmpty(),
	check('email',"Email is required").notEmpty().isEmail()
]

const checkLoginReq = [
	check('username',"Username is required").notEmpty().isLength({ max:20 }),
	check('password', "Password is required").notEmpty().isLength({ max:40 })
]

module.exports = {checkAddUserReq, checkLoginReq};