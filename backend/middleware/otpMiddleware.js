
const otp = require("../controllers/2faController.js");
const User = require('../models/User.js');

const checkOTP = async (req, res, next) => {
    try {
		const { username, password, otpToken } = req.body;

		let user = await User.findOne({ username });

		const otpVerify = otp.verifyOTP(user.totpSecret, otpToken);

		if (!otpVerify) {
			return res.status(400).json({ message: "Invalid Token" });
		} else {
            next()
        }
    }
	catch (err) {
		console.log(err.message)
		return res.status(500).json({ message: "Internal Error" });
	}
}

module.exports = {checkOTP}