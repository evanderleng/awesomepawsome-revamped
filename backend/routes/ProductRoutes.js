const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/authMiddleware.js')
const { checkAddProductReq, checkProdIdReq } = require('../middleware/validators/productValidator.js')
const {checkValid} = require('../middleware/validators/validatorMiddleware.js')
const productController = require("../controllers/productController.js");

router.route("/getRecommended").get(authMiddleware.auth, productController.getRecommended);
router.route("/getProduct").get(productController.getProduct);
router.route("/:product_id").get(checkProdIdReq, checkValid, productController.getProductById);
router.route("/addProduct").post(authMiddleware.authAdmin, productController.addProduct);

module.exports = router;