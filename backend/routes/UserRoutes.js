const express = require('express');
const router = express.Router();


const authMiddleware = require('../middleware/authMiddleware.js')
const userController = require("../controllers/userController.js");


router.route("/editUsername").patch(authMiddleware.auth, userController.editProfile);

router.post("/addUser", userController.addUser);
router.post("/login", userController.login);



module.exports = router;
