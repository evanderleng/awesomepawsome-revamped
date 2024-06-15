const express = require('express');
const router = express.Router();


const authMiddleware = require('../middleware/authMiddleware.js')
const reviewController = require("../controllers/reviewController.js");


router.route("/getReview").get(reviewController.getReview);
router.route("/addReview").post(authMiddleware.auth, reviewController.addReview);


module.exports = router;
