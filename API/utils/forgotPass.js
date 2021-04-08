'use strict';
const express = require("express");

const nodemailer = require("nodemailer");

const createToken = require("./createToken");

// step 1
let transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "testingemailnodejs@gmail.com",
    pass: "1234admin",
  },
});
// step 2
//const createToken 

let mailOptions = {
  from: "testingnodejs@gmail.com",
  to: "defjamvk@gmail.com",
  subject: "Node.js Password Reset",
  text:
    "You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n" +
    "Please click on the following link, or paste this into your browser to complete the process:\n\n" +
    "http://reset/" +
    createToken("1") +
    "\n\n" +
    "If you did not request this, please ignore this email and your password will remain unchanged.\n",
};



 const createToken = transporter.sendMail(mailOptions, function (err, data) {
    if (err) {
      console.log("error not sent___", err);
      //res.render("forgotPassword");
    } else {
      console.log("email is sent");
      //res.render("reset");
    }
  });


module.exports = createToken;