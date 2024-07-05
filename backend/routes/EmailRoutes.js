const express = require('express');
const router = express.Router();
const { rateLimit } = require("express-rate-limit");
const MongoStore = require('rate-limit-mongo');

const emailController = require("../controllers/emailController.js")

const {checkEmailReq} = require('../middleware/validators/emailValidator.js')
const {checkLoginReq} = require('../middleware/validators/userValidator.js')
const {checkValid} = require('../middleware/validators/validatorMiddleware.js')

const accountLimiter = rateLimit({
    windowMs:  1000 * 60 * 10, //10 minutes
    limit: 20, 
    standardHeaders: true, 
    legacyHeaders: false,
    message: {message: "We have detected an unsual amount of login attempts for this account, and it has been temporarily locked. Please try again later."},
    keyGenerator: function(req) {
      return req.body.username
    },
    store: new MongoStore({
        uri: process.env.DB_URI,
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        expireTimeMs: 1000 * 60 * 10, //10 minutes
        errorHandler: console.error.bind(null, 'rate-limit-mongo')
    }),
    skipSuccessfulRequests: true
})

const ipLimiter = rateLimit({
    windowMs:  1000 * 60 * 60, // 1h
    limit: 30, //30 failed attempts from same ip
    standardHeaders: true, 
    legacyHeaders: false,
    message: {message: "We have detected an unsual amount of login attempts for this IP address. Please try again later."},
    keyGenerator: function(req) {
      return req.ip
    },
    store: new MongoStore({
        uri: process.env.DB_URI,
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        expireTimeMs: 1000 * 60 * 60, // 1h
        errorHandler: console.error.bind(null, 'rate-limit-mongo')
    }),
    skipSuccessfulRequests: true
})




router.post("/send2faEmail_ResetPassword", checkEmailReq, checkValid, emailController.send2faEmail_ResetPassword)

router.post("/sendResetPasswordEmail", checkEmailReq, checkValid, emailController.sendResetPasswordEmail)

router.route("/send2faEmail_Login").post(ipLimiter, accountLimiter, checkLoginReq, checkValid, emailController.send2faEmail_Login)

module.exports = router;