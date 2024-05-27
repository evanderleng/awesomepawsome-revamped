const express = require('express');
const router = express.Router();


const userController = require("../controllers/userController.js");


router.post("/addUser", userController.addUser);
router.post("/login", userController.login);


module.exports = router;
