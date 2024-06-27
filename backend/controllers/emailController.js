const transporter = require("../services/EmailService.js")
const User = require('../models/User.js');

const sendTestEmail = async(req, res) => {
    // Sends test email to email of your choice
    transporter.sendMail({
        from: '"AwesomePawsome" <${process.env.GMAIL_USER_EMAIL}>', // sender address
        to: "receiverone@gmail.com, receivertwo@outlook.com", // list of receivers
        subject: "Test Email from AwesomePawsome", // Subject line
        text: "test 12345", // plain text body
        html: "<b>test 12345</b>", // html body
    }).then(info => {
        return res.status(200).json({message: "Successfully sent!", contents: {info}});
    }).catch(err => {
        console.log(err) // remove when submitting
        return res.status(400).json({message: "Unsuccessfully sent :(", err: {err}})
    })
}

const postEmail = async(req, res) => {
    const {email} = req.body;
    transporter.sendMail({
        from: '"AwesomePawsome" <${process.env.GMAIL_USER_EMAIL}>', // sender address
        to: email,//to: "receiverone@gmail.com, receivertwo@outlook.com", // list of receivers
        subject: "Test Email from AwesomePawsome", // Subject line
        text: "test 12345", // plain text body
        html: "<b>test 12345</b>", // html body
    }).then(info => {
        return res.status(200).json({message: "Successfully sent!", contents: {info}});
    }).catch(err => {
        console.log(err); // remove when submitting
        return res.status(400).json({message: "Unsuccessfully sent :(", err: {err}})
    })
}

const verify = async(req, res) => {
    transporter.verify().then(info => {
        return res.status(200).json({message: {info}});
    }).catch(err => {
        console.log(err) // remove when submitting
        return res.status(400).json({err: {err}});
    })
}

module.exports = {sendTestEmail, postEmail, verify};