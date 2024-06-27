const nodemailer = require('nodemailer');

require('dotenv').config();
// console.log("GMAIL_USER_EMAIL:", process.env.GMAIL_USER_EMAIL);
// console.log("GMAIL_APP_PW:", process.env.GMAIL_APP_PW);

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER_EMAIL,
    pass: process.env.GMAIL_APP_PW,
  },
});


module.exports = transporter;
