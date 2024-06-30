const express = require('express');
const router = express.Router();

const emailController = require("../controllers/emailController.js")

const {checkEmailReq} = require('../middleware/validators/emailValidator.js')
const {checkLoginReq} = require('../middleware/validators/userValidator.js')
const {checkValid} = require('../middleware/validators/validatorMiddleware.js')

// Reset Password - 2FA
router.post("/send2faEmail_ResetPassword", checkEmailReq, checkValid, emailController.send2faEmail_ResetPassword)

// Reset Password - Send Email
router.post("/sendResetPasswordEmail", checkEmailReq, checkValid, emailController.sendResetPasswordEmail)

// Reset Password - Confirmation Email
// TODO

// Login - 2FA
router.post("/send2faEmail_Login", checkLoginReq, checkValid, emailController.send2faEmail_Login)

module.exports = router;