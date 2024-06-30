const nodemailer = require('nodemailer');

require('dotenv').config()

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER_EMAIL,
    pass: process.env.GMAIL_APP_PW,
  },
});


module.exports = transporter;
