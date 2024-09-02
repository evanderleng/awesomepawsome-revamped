const express = require("express");
const router = express.Router();

const {auth} = require("../middleware/authMiddleware.js");
const {createCheckoutSession, sessionStatus} = require("../controllers/order2Controller.js");


router.route("/create-checkout-session").post(auth, createCheckoutSession);
router.route("/session-status").get(sessionStatus);

module.exports = router;