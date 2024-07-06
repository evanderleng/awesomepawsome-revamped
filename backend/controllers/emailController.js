const crypto = require('crypto');
const speakeasy = require('speakeasy');
const bcrypt = require('bcryptjs');
const dotenv = require("dotenv");

const transporter = require("../services/EmailService.js");
const User = require('../models/User.js');
const otp = require("./2faController.js");

dotenv.config();

const sendResetPasswordEmail = async (req, res) => {
    try {
        const { email, otpToken } = req.body;
        const user = await User.findOne({ email });

        // Will only send email if user is present
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const otpVerify = otp.verifyOTP(user.totpSecret, otpToken)
        
        if (!otpVerify){
            return res.status(400).json({ message: 'Invalid token' });
        }

        const token = crypto.randomBytes(20).toString('hex'); // generate reset token here
        const tokenExpiry = Date.now() + 3600000; // 1 hour from now
        
        try{
            user.resetPasswordToken = token;
            user.resetPasswordExpires = tokenExpiry;
            await user.save();
            console.log("added reset token for user")
        }
        catch (err){
            console.log("Unable to update user")
        }
        
        const resetPasswordLink_dev = `http://localhost:5173/resetPasswordPage?token=${token}`  
        const resetPasswordLink_prod = `https://awesomepawsome.shop/resetPasswordPage?token=${token}` 

        let resetPasswordLink;

        if (process.env.NODE_ENV === "development"){
            resetPasswordLink = resetPasswordLink_dev;
        }
        else{
            resetPasswordLink = resetPasswordLink_prod;
        }

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
            }).then(info => { // info here is email status info from gmail
                return res.status(200).json({ message: "Successfully sent!" }); 
            })
        }
        catch (err){
            return res.status(400).json({message: "Unable to send"});
        }
    }
    catch (err) {
        // console.log(err) 
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
                return res.status(200).json({ message: "Successfully sent 2FA token!"});
            })
        }
        catch (err){
            return res.status(400).json({message: "Unable to send 2FA token"});
        }   
        
    }
    catch (err) {
        // console.log(err) 
        return res.status(500).json({ message: 'Internal Error'}); 
    }
}

const send2faEmail_Login = async (req, res) => {
    try {
        const {username, password} = req.body;
        let user = await User.findOne({ username });

        if (!user) {
            return res.status(401).json({message: "Invalid Credentials"})
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
            return res.status(200).json({ message: "Successfully sent 2FA token!" });
        } catch (err) {
            // console.error(err); 
            return res.status(400).json({ message: 'Unable to send 2FA token'});
        }
    }
    catch (err) {
        // console.log(err) 
        return res.status(500).json({ message: 'Internal Error'}); 
    }
}

const sendPasswordResetConfirmationEmail = async (user) => {
    try {
        const emailContent = `
            <p>Dear ${user.username},</p>
            <p>Your password has been successfully reset.</p>
            <p>If you did not request this change, please contact our support team immediately.</p>
            <p>Regards,<br>AwesomePawsome</p>
        `;

        await transporter.sendMail({
            from: `"AwesomePawsome" <${process.env.GMAIL_USER_EMAIL}>`, // sender address
            to: user.email, // receiver's email
            subject: 'Password Reset Successful', // Subject line
            html: emailContent, // html body
        });
    }
    catch (err) {
        // console.log(err) 
        throw new Error("Unable to send reset password confirmation email") 
    }
}

const verify = async (req, res) => {
    // Verifies if connection to Gmail SMTP server is working
    transporter.verify().then(info => {
        return res.status(200).json({ message: { info } });
    }).catch(err => {
        // console.log(err) 
        return res.status(400).json({ err: { err } });
    })
}

module.exports = { verify, sendResetPasswordEmail, send2faEmail_ResetPassword, send2faEmail_Login, sendPasswordResetConfirmationEmail };