const express = require('express');
const router = express.Router();

const productController = require("../controllers/productController.js");


router.post("/getProduct", productController.getProduct);


module.exports = router;
