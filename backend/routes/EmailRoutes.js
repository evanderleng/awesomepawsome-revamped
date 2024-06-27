const express = require('express');
const router = express.Router();

const emailController = require("../controllers/emailController.js")

// TODO
// router.post("/resetPassword", <request checks>** , <request controller>.<function>)
// router.post("/2fa", <request checks>** , <request controller>.<function>)

router.route("/sendTestEmail").get(emailController.sendTestEmail)

module.exports = router;