const express = require('express');
const router = express.Router();


const authMiddleware = require('../middleware/authMiddleware.js')
const {checkAddReviewReq} = require('../middleware/validators/reviewValidator.js')
const {checkValid} = require('../middleware/validators/validatorMiddleware.js')
const reviewController = require("../controllers/reviewController.js");
const {checkOrderReview } = require('../controllers/reviewController');
const {checkProductReview } = require('../controllers/reviewController');



router.route("/getReview").get(reviewController.getReview);
router.route("/addReview").post(authMiddleware.auth, checkAddReviewReq, checkValid, reviewController.addReview);
router.get('/checkReview/:orderId', checkOrderReview);
router.get('/checkReview/:orderId/:productId', checkProductReview);



module.exports = router;
