const express = require('express');
const router = express.Router();


const authMiddleware = require('../middleware/authMiddleware.js')
const {checkAddReviewReq, checkGetReviewReq} = require('../middleware/validators/reviewValidator.js')
const {checkValid} = require('../middleware/validators/validatorMiddleware.js')
const reviewController = require("../controllers/reviewController.js");
const {checkOrderReview } = require('../controllers/reviewController');
const {checkProductReview } = require('../controllers/reviewController');
const { checkCSRF } = require('../middleware/csrfMiddleware.js');



router.route("/getReview").get(checkGetReviewReq, checkValid, reviewController.getReview);
router.route("/addReview").post(authMiddleware.auth, checkCSRF, checkAddReviewReq, checkValid, reviewController.addReview);



module.exports = router;
