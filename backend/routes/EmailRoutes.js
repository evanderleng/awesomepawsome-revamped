const express = require('express');
const router = express.Router();

const emailController = require("../controllers/emailController.js")

const {checkEmailReq} = require('../middleware/validators/emailValidator.js')
const {checkValid} = require('../middleware/validators/validatorMiddleware.js')

// TODO
// 2fa checks
// reset password checks

router.post("/sendResetPasswordEmail", checkEmailReq, checkValid, emailController.sendResetPasswordEmail)

module.exports = router;