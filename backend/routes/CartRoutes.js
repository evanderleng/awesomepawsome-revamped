const express = require('express');
const router = express.Router();


const authMiddleware = require('../middleware/authMiddleware.js')
const cartController = require("../controllers/cartController.js");


router.route("/hasCart").post(authMiddleware.auth, cartController.hasCart);

module.exports = router;
