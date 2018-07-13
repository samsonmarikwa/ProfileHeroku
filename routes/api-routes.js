require('dotenv').config();
var nodemailer = require('nodemailer');
var request = require('request');

// api routes

module.exports = function(app) {

    // process message 
    app.post("/api/contact", function(req, res) {

        var name = req.body.name;
        var email = req.body.email;
        var phone = req.body.phone;
        var msg = req.body.message;
        var captcha = req.body.captcha;

        if (captcha === undefined || captcha === '' || captcha === null || !captcha) {
            return res.json({
                success: false,
                title: "reCAPTCHA Fail",
                message: "Please tick 'I'm not a robot' and follow reCAPTCHA instructions."
            });
        }

        if (name === undefined || name === '' || name === null || !name) {
            return res.json({
                success: false,
                title: "Missing Name",
                message: "Please enter your name and resubmit."
            });
        }

        if (email === undefined || email === '' || email === null || !email) {
            return res.json({
                success: false,
                title: "Missing EMail Address",
                message: "Please enter your email address and resubmit."
            });
        }

        if (msg === undefined || msg === '' || msg === null || !msg) {
            return res.json({
                success: false,
                title: "Missing Message Text",
                message: "Please enter your message text and resubmit."
            });
        }

        var secretKey = process.env.CAPTCHA_KEY;

        var siteVerify = `https://google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${req.body.captcha}&remoteip=${req.connection.remoteAddress}`;

        request(siteVerify, function(err, resp, body) {
            body = JSON.parse(body);

            // check if not successful
            if (body.success !== undefined && !body.success) {
                return res.json({
                    success: false,
                    title: "reCAPTCHA Test",
                    message: "Failed reCAPTCHA test for Human. Please try again reCAPTCHA test"
                });
            }

            // captcha successful, so send message
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'airnowapp2@gmail.com',
                    pass: 'Shanghai#123'
                }
            });

            var to = "samsonmarikwa@outlook.com";
            var from = "airnowapp2@gmail.com";
            var subject = "Profile Enquiry";
            var html = "<h2>Name: " + name + "</h2>";
            html += "<h2>From: " + email + "</h2>";
            html += "<h2>Phone: " + phone + "</h2>";
            html += "<h2>Message</h2><p>" + msg + "</p>";

            // Message object
            var message = {
                from: from,
                to: to,
                subject: subject,
                html: html
            };

            transporter.sendMail(message, (err, info) => {
                if (err) {
                    return res.json({
                        success: false,
                        title: 'Mailer Transport Failure',
                        message: "I would like to apologize for the inconvenience\nPlease sms +1(704)941-8480 with your request"
                    });
                }
                res.json({
                    success: true,
                    title: "Mailer Transport",
                    message: "Thank you for your message\nI will respond to you in a short while"
                });
            });
        });
    });
}