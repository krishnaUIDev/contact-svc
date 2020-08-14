"use strict";
const nodemailer = require("nodemailer");
const config = require("config");

// intigrate with smtp

module.exports = async function mailer(emailAddress) {
  let transporter = nodemailer.createTransport({
    // host: "smtp.ethereal.email",
    // port: 587,
    // secure: false, // true for 465, false for other ports
    service: "gmail",
    auth: {
      user: config.get("email"),
      pass: config.get("emailPass"),
    },
  });

  let info = await transporter.sendMail({
    from: config.get("email"),
    to: emailAddress,
    subject: "Hello ✔",
    text: "Hello world?",
    html: "<b>Hello world?</b>",
  });
  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
};
