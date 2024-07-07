
const User = require('../models/User.js');
const Order = require('../models/Order.js');
const Review = require('../models/Review.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookie = require('cookie');
const escape = require('escape-html');
const multer = require('multer');
const mongoose = require('mongoose');
const { checkCSRF } = require('../middleware/csrfMiddleware.js');
const { checkEditProfileReq }  = require('../middleware/validators/userValidator.js');
const speakeasy = require('speakeasy') // for totp generationvar 
const { csrf_generator, csrf_secret } = require('../util/csrf')

const { uploadToLocal, uploadAvatar } = require("../middleware/imageMiddleware.js")
const { sendPasswordResetConfirmationEmail } = require("./emailController.js")

const otp = require("./2faController.js");

const addUser = async (req, res) => {
	try {
		let { username, password, email } = req.body;

		username = escape(username);
		email = escape(email);

		let user = await User.findOne({ $or: [{ username }, { email }] });
		if (user) {
			//if already exists existing username or email
			if (user.username == username) {
				return res.status(400).json({ message: "Username is already taken." });
			} else if (user.email == email) {
				return res
					.status(400)
					.json({ message: "Email has already registered." });
			}
		}

		const hash = bcrypt.hashSync(password, bcrypt.genSaltSync());

		user = await User.create({
			username,
			password: hash,
			email,
			admin: false,
			address: "",
			avatar: "https://res.cloudinary.com/dg7xhtwnl/image/upload/v1719492487/avatars/default.jpg",
			totpSecret: speakeasy.generateSecret().base32
		});
		return res.status(201).json({ message: "Successfully added!" })
	} catch (err) {
		return res.status(500).json({ message: "Failed" });
	}
}

const login = async (req, res) => {
	try {
		const { username, password } = req.body;

		const csrf_secret = csrf_generator.secretSync()
		const csrf_token = csrf_generator.create(csrf_secret)

		let user = await User.findOne({ username });

		if (!user) {
			return res.status(404).json({ message: "Invalid Credentials" });
		}
		if (!bcrypt.compareSync(password, user.password)) {
			return res.status(401).json({ message: "Invalid Credentials" });
		} else {

			//insert csrf secret into db
			const updateUser = await User.updateOne(
				{ username },
				{ $set: { csrf_secret } }
			);

			const jwt_token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET, {
				algorithm: "HS512",
				expiresIn: "36000s",
			});

			return res.status(200).json({
				message: "Login successful",
				username: user.username,
				_id: user._id,
				admin: user.admin,
				avatar: user.avatar,
				jwt_token: jwt_token,
				csrf_token: csrf_token
			});
		}
	}
	catch (err) {
		return res.status(500).json({ message: "Internal error" });
	}
}

const getProfile = async (req, res) => {
	try {
		let user = await User.findOne(
			{ _id: req.user._id },
			{
				_id: 0,
				username: 1,
				email: 1,
				createdAt: 1,
				address: 1,
				avatar: 1,
				petDetails: 1,
			},
		);

		if (!user) {
			return res.status(404).json({ message: "Error" });
		}

		user.username = escape(user.username);
		user.email = escape(user.email);
		user.createdAt = escape(user.createdAt);
		user.address = escape(user.address);
		user.avatar = escape(user.avatar);

		if (user.petDetails) {
			user.petDetails.petName = escape(user.petDetails.petName);
			user.petDetails.petBreed = escape(user.petDetails.petBreed);
			user.petDetails.petAge = escape(user.petDetails.petAge);
			user.petDetails.petSize = escape(user.petDetails.petSize);
		}
		return res.status(200).json(user);
	} catch (err) {
		//console.error("Error fetching user profile:", err.message);
		return res.status(500).json({ message: "Error" });
	}
};

const editPet = async (req, res) => {
	try {
		let { petName, petBreed, petAge, petSize } = req.body.petDetails;

		if (petName) {petName = escape(petName);} else {petName = ""}
		if (petBreed) {petBreed = escape(petBreed);} else {petBreed = ""}
		if (petAge) {petAge = escape(petAge);} else {petAge = ""}
		if (petSize) {petSize = escape(petSize);} else {petSize = ""}

		const updateUser = await User.updateOne(
			{ _id: req.user._id },
			{ $set: { petDetails: { petName, petBreed, petAge, petSize } } },
		);

		if (updateUser) {
			return res.status(200).json({ message: "Edit Success" });
		} else {
			return res.status(500).json({ message: "Edit Failed" });
		}
	} catch (err) {
		return res.status(500).json({ message: "Error" });
	}
};

const canReview = async (req, res) => { //req param product_id
	try {
		const { product_id } = req.query

		let hasProduct = false
		let hasReview = true //assume worst

		const order = await Order.find({
            user_id: req.user._id,
			"order_list.product_id": new mongoose.Types.ObjectId(product_id)
		})
		if (order.length > 0){
			hasProduct = true
		} else {
			hasProduct = false
		}

		const review = await Review.find({
            user_id: req.user._id,
			"product_id": new mongoose.Types.ObjectId(product_id)
        });
		if (review.length > 0){
			hasReview = true
		} else {
			hasReview = false
		}

		if (hasProduct == true && hasReview == false){
			return res.status(200).json({ canReview: true });
		} else if (hasProduct == false){
			return res.status(200).json({ canReview: false, message: "Please purchase the product before leaving a review" });
		} else if (hasReview == true){
			return res.status(200).json({ canReview: false, message: "Already left a review for this product." });
		}
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}
};

const editProfile = async (req, res) => {
	const upload = await uploadToLocal.single('avatar');
	upload(req, res, async function (err) {
		if (err) {
			return res.status(500).json({ message: "Internal Error"});
		}
		checkCSRF(req, res, async function (err) {

			for (const validation of checkEditProfileReq) { //integrated validation
                const errors = await validation.run(req);
                if (!errors.isEmpty()) {
                    return res.status(400).json({
                        message: errors.array()[0].msg, 
                        path: errors.array()[0].path
                    });
                }
            }

			try{
				const { username, email, address } = req.body;
				const updateData = { username, email, address };

				if (req.file) {
					const cloudImgUrl = await uploadAvatar(req.file, req.user.username); //hehehe
					updateData.avatar = cloudImgUrl;
				}

				const actualUser = await User.findOne({ _id: req.user._id });
				if (!actualUser) {
					return res.status(500).json({ message: "Edit failed" });
				}
				const userUsername = await User.findOne({ username });
				if (userUsername && userUsername._id != req.user._id) { //if already exists existing username 
					return res.status(400).json({ message: "Username is already taken" })
				}
				const userEmail = await User.findOne({ email });
				if (userEmail && userEmail.email != actualUser.email) { //if already exists existing email
					return res.status(400).json({ message: "Email has already registered with another account" })
				}
				const updateUser = await User.updateOne({ _id: req.user._id }, { $set: updateData });
				if (updateUser) {
					return res.status(200).json({ message: "Edit Success" });
				} else {
					return res.status(500).json({ message: "Edit Failed" });
				}
			} catch (err) {
				if (err instanceof multer.MulterError){
					return res.status(500).json({ message: "Only png, jpg, jpeg are accepted. Filesize limited to 3MB"});
				} else {
					return res.status(500).json({ message: "Only png, jpg, jpeg are accepted. Filesize limited to 3MB"});
				}
			}
		});
	});
};

const resetPassword = async (req, res) => {
	try {
		const { resetToken, newPassword } = req.body;

		let user = await User.findOne({
			resetPasswordToken: resetToken,
			resetPasswordExpires: { $gt: Date.now() }
		})

		if (!user) {
			return res.status(401).json({ message: "Invalid or Expired Token" })
		}

		const hash = bcrypt.hashSync(newPassword, bcrypt.genSaltSync());

		user.password = hash;
		user.resetPasswordToken = undefined;
		user.resetPasswordExpires = undefined;

		await user.save();
		try {
			await sendPasswordResetConfirmationEmail(user);
    		return res.status(200).json({ message: 'Password has been reset successfully.'})
		}
		catch (err) {
			return res.status(400).json({ message: 'Unable to send confirmation email' })
		}
	}
	catch (err) {
		// console.error(err); 
		return res.status(500).json({ message: "Internal Error" })
	}
}

module.exports = { addUser, login, editProfile, editPet, getProfile, resetPassword, canReview  };
