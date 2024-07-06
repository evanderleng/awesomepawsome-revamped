const {check, validationResult} = require('express-validator');

const emailMsg = "Email must be a valid email"

const checkEmailReq = [
    check('email', emailMsg).notEmpty().isEmail() // Email must not be empty and must be a valid email
];

module.exports = { checkEmailReq };