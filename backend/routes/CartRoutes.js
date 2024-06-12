const express = require('express');
const router = express.Router();


const authMiddleware = require('../middleware/authMiddleware.js')
const cartController = require("../controllers/cartController.js");


router.route("/hasCart").get(authMiddleware.auth, cartController.hasCart);
router.route("/getCart").get(authMiddleware.auth, cartController.getCart);
router.route("/updateCart").post(authMiddleware.auth, cartController.updateCart);

module.exports = router;
