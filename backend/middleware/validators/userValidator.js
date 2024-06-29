const {check, validationResult} = require('express-validator');


const usernameRegex = /^[\w\d]+$/g //alphanumeric + underscore only, at least 1 char
const usernameMsg = "Username can only contain alphabets, digits and underscores"

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W)(?!.* )[a-zA-Z\d\W]{8,}$/g //8+ character, must have 1 lower 1 upper 1 number 1 symbol no space
const passwordMsg = "Password must be at least 8 characters and contain one uppercase, lowercase, digit and symbol"

const checkAddUserReq = [
	check('username', usernameMsg).matches(usernameRegex).notEmpty(),
	check('password', passwordMsg).matches(passwordRegex).notEmpty(),
	check('email',"Email is required").notEmpty().isEmail()
	
]

const checkLoginReq = [
	check('username',"Username is required").notEmpty(),
	check('password', "Password is required").notEmpty()
]

module.exports = {checkAddUserReq, checkLoginReq};