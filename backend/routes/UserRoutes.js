const express = require('express');
const router = express.Router();


const authMiddleware = require('../middleware/authMiddleware.js')
const {checkAddUserReq, checkLoginReq, checkEditProfileReq} = require('../middleware/validators/userValidator.js')
const {checkValid} = require('../middleware/validators/validatorMiddleware.js')
const userController = require("../controllers/userController.js");


router.route("/editPet").post(authMiddleware.auth, userController.editPet);
router.route("/editProfile").post(authMiddleware.auth, userController.editProfile);
router.route("/getProfile").get(authMiddleware.auth, userController.getProfile);
//router.route("/editAvatar").post(authMiddleware.auth, userController.editAvatar);

router.post("/addUser", checkAddUserReq, checkValid, userController.addUser);
router.post("/login", checkLoginReq ,checkValid, userController.login);



module.exports = router;
