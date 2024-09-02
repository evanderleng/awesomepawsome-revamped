const express = require('express');
const router = express.Router();


const authMiddleware = require('../middleware/authMiddleware.js')
const {checkAddBookReq} = require('../middleware/validators/bookValidator.js')
const {checkValid} = require('../middleware/validators/validatorMiddleware.js')
const { checkCSRF } = require('../middleware/csrfMiddleware.js');
const bookController = require("../controllers/bookController.js");



router.route("/:page").get(bookController.getBook);
router.route("/addBook").post(authMiddleware.auth, checkCSRF, checkAddBookReq, checkValid, bookController.addBook);



module.exports = router;
