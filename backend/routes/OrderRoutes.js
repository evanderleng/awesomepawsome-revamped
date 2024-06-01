const express = require('express');
const router = express.Router();


const authMiddleware = require('../middleware/authMiddleware.js')
const orderController = require("../controllers/orderController.js");


router.route("/confirm").post(authMiddleware.auth, orderController.confirmOrder);


module.exports = router;
