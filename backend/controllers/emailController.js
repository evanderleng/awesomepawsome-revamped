const crypto = require('crypto');

const transporter = require("../services/EmailService.js")
const User = require('../models/User.js');


const sendResetPasswordEmail = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        
        // Will only send email if user is present
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

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
    catch (err) {  
        console.log(err) // TODO: remove this line when submitting
        return res.status(500).json({ message: 'Internal Error', errors:{err} });
        // return res.status(400).json({ message: 'Internal Error'}); // TODO: uncomment this and remove above when submitting
    }
}

const send2faEmail = async (req, res) =>{
    // TODO: 2FA
    try {

    }
    catch (err){

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

module.exports = { verify, sendResetPasswordEmail };