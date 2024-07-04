const express = require('express');
const router = express.Router();
const { checkCSRF } = require('../middleware/csrfMiddleware.js');


const authMiddleware = require('../middleware/authMiddleware.js')
const {checkUpdateCartReq} = require('../middleware/validators/cartValidator.js')
const {checkValid} = require('../middleware/validators/validatorMiddleware.js')
const cartController = require("../controllers/cartController.js");


router.route("/hasCart").get(authMiddleware.auth, cartController.hasCart);
router.route("/getCart").get(authMiddleware.auth, cartController.getCart);
router.route("/updateCart").post(authMiddleware.auth, checkCSRF, checkUpdateCartReq, checkValid, cartController.updateCart);


module.exports = router;
