const crypto = require('crypto');
const speakeasy = require('speakeasy');
const bcrypt = require('bcryptjs');

const transporter = require("../services/EmailService.js");
const User = require('../models/User.js');
const otp = require("./2faController.js");

let otpTokenStore = {};

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

            try{
                transporter.sendMail({
                    from: '"AwesomePawsome" <${process.env.GMAIL_USER_EMAIL}>', // name + sender address
                    to: email,                                                  // list of receivers
                    subject: "Password Reset Request",                          // Subject line
                    html: emailContent,                                         // html body
                }).then(info => {
                    return res.status(200).json({ message: "Successfully sent!" });
                })
            }
            catch (err){
                return res.status(400).json({message: "Unable to send"});
            } 
        }
    }
    catch (err) {
        console.log(err) // TODO: remove this line when submitting
        return res.status(500).json({ message: 'Internal Error'}); 
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

        const emailContent = `
            <p>Dear ${user.username},</p>
            <p>A multi-factor authentication code has been requested. This token is valid for <b>3 minutes</b>.</p>
            <p>MFA Code: </p>
            <h1>${token}</h1>
            <p>Regards,<br>AwesomePawsome</p>
        `;
        try{
            transporter.sendMail({
                from: '"AwesomePawsome" <${process.env.GMAIL_USER_EMAIL}>', // name + sender address
                to: email,                                                  // list of receivers
                subject: "Reset Password - 2FA Token",                      // Subject line
                html: emailContent,                                         // html body
            }).then(info => {
                // return res.status(200).json({ message: "Successfully sent 2FA token!" });
                return res.status(200).json({ message: "Successfully sent 2FA token!", token: token}); //TODO  for debugging, remove this when submitting
            })
        }
        catch (err){
            return res.status(400).json({message: "Unable to send 2FA token"});
        }   
        
    }
    catch (err) {
        console.log(err) // TODO: remove this line when submitting
        return res.status(500).json({ message: 'Internal Error'}); 
    }
}

const send2faEmail_Login = async (req, res) => {
    try {
        const {username, password} = req.body;
        let user = await User.findOne({ username });

        if (!user) {
            return { status: 404, message: 'User not found' };
        }

        if (!bcrypt.compareSync(password, user.password)){
            return res.status(401).json({message: "Invalid Credentials"})
        }
        
        const token = otp.generateOTP(user.totpSecret);

        const emailContent = `
            <p>Dear ${user.username},</p>
            <p>A multi-factor authentication code has been requested. This token is valid for <b>3 minutes</b>.</p>
            <p>MFA Code: </p>
            <h1>${token}</h1>
            <p>Regards,<br>AwesomePawsome</p>
        `;

        try {
            await transporter.sendMail({
                from: `"AwesomePawsome" <${process.env.GMAIL_USER_EMAIL}>`,
                to: user.email,
                subject: "Login - 2FA Token",
                html: emailContent,
            });
            // return res.status(200).json({ message: "Successfully sent 2FA token!" });
            return res.status(200).json({ message: "Successfully sent 2FA token!", token: token}); //TODO  for debugging, remove this when submitting
        } catch (err) {
            console.error(err); // TODO: remove this line when submitting
            return { status: 400, message: 'Unable to send 2FA token' };
        }
    }
    catch (err) {
        console.log(err) // TODO: remove this line when submitting
        return res.status(500).json({ message: 'Internal Error'}); 
    }
}

const sendPasswordResetConfirmationEmail = async (req, res) => {
    // TODO: Password Reset Confirmation
    try {

    }
    catch (err) {
        console.log(err) // TODO: remove this line when submitting
        return res.status(500).json({ message: 'Internal Error'}); 
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