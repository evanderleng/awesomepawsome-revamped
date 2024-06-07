const express = require('express');
const router = express.Router();


const authMiddleware = require('../middleware/authMiddleware.js')
const userController = require("../controllers/userController.js");


router.route("/editProfile").patch(authMiddleware.auth, userController.editProfile);
router.route("/getProfile").get(authMiddleware.auth, userController.getProfile);

router.post("/addUser", userController.addUser);
router.post("/login", userController.login);



module.exports = router;
