const crypto = require('crypto');
const speakeasy = require('speakeasy');

const transporter = require("../services/EmailService.js");
const User = require('../models/User.js');
const otp = require("./2faController.js");

let otpTokenStore = {};

// const storedTokenData = otpTokenStore[email];
        
// // OTP Checks
// if (storedTokenData.token !== token) {
//     return res.status(400).json({ message: 'Invalid OTP token' });
// }
// if (Date.now() > storedTokenData.expires) {
//     return res.status(400).json({ message: 'OTP token has expired' });
// }

// const otpVerify = otp.verifyOTP(user.totpSecret, storedTokenData.token)

const sendResetPasswordEmail = async (req, res) => {
    try {
        const { email, otpToken } = req.body;
        const user = await User.findOne({ email });

        // Will only send email if user is present
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const otpVerify = otp.verifyOTP(user.totpSecret, otpToken)
        if (otpVerify) {
            const token = crypto.randomBytes(20).toString('hex');

            const resetPasswordLink = `https://awesomepawsome.shop/reset-password?token=${token}`

            const emailContent = `
                <p>Dear ${user.username},</p>
                <p>Click here to reset your password:</p>
                <p><a href="${resetPasswordLink}">Reset Password</a></p>
                <p>Love,<br>AwesomePawsome</p>
            `;

            transporter.sendMail({
                from: '"AwesomePawsome" <${process.env.GMAIL_USER_EMAIL}>', // name + sender address
                to: email,                                                  // list of receivers
                subject: "Password Reset Request",                          // Subject line
                html: emailContent,                                         // html body
            }).then(info => {
                return res.status(200).json({ message: "Successfully sent!", contents: { info } });
            })
        }
    }
    catch (err) {
        console.log(err) // TODO: remove this line when submitting
        return res.status(500).json({ message: 'Internal Error', errors: { err } });
        // return res.status(400).json({ message: 'Internal Error'}); // TODO: uncomment this and remove above when submitting
    }
}

const send2faEmail_ResetPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const token = otp.generateOTP(user.totpSecret);

        otpTokenStore[email] = {token, "expires": Date.now() + 180000};
        console.log(otpTokenStore);
        
        const emailContent = `
            <p>Dear ${user.username},</p>
            <p>A multi-factor authentication code has been requested. This token is valid for <b>3 minutes</b>.</p>
            <p>MFA Code: </p>
            <h1>${token}</h1>
            <p>Regards,<br>AwesomePawsome</p>
        `;

        transporter.sendMail({
            from: '"AwesomePawsome" <${process.env.GMAIL_USER_EMAIL}>', // name + sender address
            to: email,                                                  // list of receivers
            subject: "Reset Password - 2FA Token",                      // Subject line
            html: emailContent,                                         // html body
        }).then(info => {
            return res.status(200).json({ message: "Successfully sent!", contents: { info } });
        })
    }
    catch (err) {
        console.log(err) // TODO: remove this line when submitting
        return res.status(500).json({ message: 'Internal Error', errors: { err } });
        // return res.status(400).json({ message: 'Internal Error'}); // TODO: uncomment this and remove above when submitting
    }
}

const send2faEmail_Login = async (req, res) => {
    // TODO: 2FA
    try {

    }
    catch (err) {
        console.log(err) // TODO: remove this line when submitting
        return res.status(500).json({ message: 'Internal Error', errors: { err } });
        // return res.status(400).json({ message: 'Internal Error'}); // TODO: uncomment this and remove above when submitting
    }
}

const sendPasswordResetConfirmationEmail = async (req, res) => {
    // TODO: Password Reset Confirmation
    try {

    }
    catch (err) {
        console.log(err) // TODO: remove this line when submitting
        return res.status(500).json({ message: 'Internal Error', errors: { err } });
        // return res.status(400).json({ message: 'Internal Error'}); // TODO: uncomment this and remove above when submitting
    }
}

const verify = async (req, res) => {
    // Verifies if connection to Gmail SMTP server is working
    transporter.verify().then(info => {
        return res.status(200).json({ message: { info } });
    }).catch(err => {
        console.log(err) // remove when submitting
        return res.status(400).json({ err: { err } });
    })
}

module.exports = { verify, sendResetPasswordEmail, send2faEmail_ResetPassword, send2faEmail_Login, sendPasswordResetConfirmationEmail };