const express = require('express');
const router = express.Router();
const { checkCSRF } = require('../middleware/csrfMiddleware.js');


const authMiddleware = require('../middleware/authMiddleware.js')
const { checkAddUserReq, checkLoginReq, checkResetPasswordTokenReq, checkEditProfileReq, checkEditPetReq } = require('../middleware/validators/userValidator.js')
const { checkValid } = require('../middleware/validators/validatorMiddleware.js')
const { checkOTP } = require('../middleware/otpMiddleware.js')
const userController = require("../controllers/userController.js");


router.route("/editPet").post(authMiddleware.auth, checkCSRF, checkEditPetReq, checkValid, userController.editPet);
//router.route("/editPet").post(authMiddleware.auth, checkCSRF, userController.editPet); //yet to add validation
router.route("/editProfile").post(authMiddleware.auth, userController.editProfile);
router.route("/getProfile").get(authMiddleware.auth, userController.getProfile);

router.post("/addUser", checkAddUserReq, checkValid, userController.addUser);
//router.post("/login", checkLoginReq, checkValid, checkOTP, userController.login);
router.post("/login", checkLoginReq, checkValid, userController.login); //dev login, no OTP needed. email WILL still be sent

//router.post("/login_2fa", checkLoginReq, checkValid, userController.login_2fa)

router.route("/hasProduct").get(authMiddleware.auth, userController.hasProduct);
router.route("/hasProduct").get(authMiddleware.auth, userController.hasReview); //to add validationsonfookqsnwbxjb

router.post("/resetPassword", checkResetPasswordTokenReq, checkValid, userController.resetPassword)

module.exports = router;
