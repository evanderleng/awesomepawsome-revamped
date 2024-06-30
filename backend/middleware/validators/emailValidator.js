const {check, validationResult} = require('express-validator');

const checkEmailReq = [
    check('email', "Email is required").notEmpty().isEmail() // Email must not be empty and must be a valid email
];

module.exports = { checkEmailReq };