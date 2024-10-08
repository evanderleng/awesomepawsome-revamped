const express = require('express');
const router = express.Router();
const { checkCSRF } = require('../middleware/csrfMiddleware.js');
const authMiddleware = require('../middleware/authMiddleware.js')
const { checkAddUserReq, checkLoginReq, checkResetPasswordTokenReq, checkEditProfileReq, checkEditPetReq, checkCanReviewReq } = require('../middleware/validators/userValidator.js')
const { checkValid } = require('../middleware/validators/validatorMiddleware.js')
const { checkOTP } = require('../middleware/otpMiddleware.js')
const userController = require("../controllers/userController.js");



router.route("/editPet").post(authMiddleware.auth, checkCSRF, checkEditPetReq, checkValid, userController.editPet);
router.route("/editProfile").post(authMiddleware.auth, userController.editProfile); //CSRF middleware called from editProfile
router.route("/getProfile").get(authMiddleware.auth, userController.getProfile);

router.post("/addUser", checkAddUserReq, checkValid, userController.addUser);
router.post("/login", checkLoginReq, checkValid, userController.login);



router.route("/canReview").get(authMiddleware.auth, checkCanReviewReq, userController.canReview);

router.post("/resetPassword", checkResetPasswordTokenReq, checkValid, userController.resetPassword)




module.exports = router;
