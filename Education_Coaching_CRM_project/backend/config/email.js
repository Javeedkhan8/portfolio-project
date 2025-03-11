const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
    service:"Gmail",
    auth:{
        user:process.env.SMTP_USER,
        pass:process.env.SMTP_PASSWORD
    }

})

const sendEmail = async (to, subject, text) => {
    await transporter.sendMail({
        from:process.env.SMTP_USER,
        to,
        subject,
        text,
    })
}

module.exports = {transporter, sendEmail}