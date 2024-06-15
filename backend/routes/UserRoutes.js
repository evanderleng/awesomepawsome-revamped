const express = require('express');
const router = express.Router();


const authMiddleware = require('../middleware/authMiddleware.js')
const validatorMiddleware = require('../middleware/validatorMiddleware.js')
const userController = require("../controllers/userController.js");


router.route("/editProfile").patch(authMiddleware.auth, userController.editProfile);
router.route("/getProfile").get(authMiddleware.auth, userController.getProfile);

router.post("/addUser",validatorMiddleware.checkAddUser, userController.addUser);
router.post("/login", userController.login);



module.exports = router;
