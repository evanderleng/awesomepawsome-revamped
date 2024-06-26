const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/authMiddleware.js')
const {checkAddProductReq} = require('../middleware/validators/productValidator.js')
const {checkValid} = require('../middleware/validators/validatorMiddleware.js')
const productController = require("../controllers/productController.js");


router.route("/getProduct").get(productController.getProduct);
router.route("/addProduct").post(authMiddleware.authAdmin, checkAddProductReq, checkValid, productController.addProduct);


module.exports = router;
