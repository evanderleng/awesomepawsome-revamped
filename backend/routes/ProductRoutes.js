const express = require('express');
const router = express.Router();

const productController = require("../controllers/productController.js");

const auth = require('../middleware/authMiddleware.js')




//router.route("/").post(auth.authenticate, auth.authenticate, auth.authenticate, productController.getProduct);
router.post("/getProduct",auth.authenticate, productController.getProduct);


module.exports = router;
