const express = require('express');
const router = express.Router();

const productController = require("../controllers/productController.js");

const authMiddleware = require('../middleware/authMiddleware.js')




router.route("/").get(productController.getProduct);
//router.post("/getProduct",authMiddleware.auth, productController.getProduct);


module.exports = router;
