const nodemailer = require('nodemailer');
require("dotenv").config();

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    // host: process.env.EMAIL_HOST,
    // port: process.env.EMAIL_PORT,
    // secure: process.env.EMAIL_SECURE === 'true', // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
    tls: {
        rejectUnauthorized: false, // 👈 required on your network
    },
});

const sendMail = async (to, subject, content, isHtml = false) => {
    const mailOptions = {
        from: "Movie Booking App <" + process.env.EMAIL_USER + ">",
        to,
        subject,
    };

    if (isHtml) {
        mailOptions.html = content;
    } else {
        mailOptions.text = content;
    }

    try {
        await transporter.sendMail(mailOptions);
        console.log("Email sent successfully");
        return true;
    } catch (error) {
        console.error("Error sending email:", error);
        return false;
    }
};

module.exports = {
    sendMail
}