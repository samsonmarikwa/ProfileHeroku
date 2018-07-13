var nodemailer = require('nodemailer');

// api routes

module.exports = function(app) {

    // process message 
    app.post("/api/contact", function(req, res) {
        var name = req.body.name;
        var email = req.body.email;
        var phone = req.body.phone;
        var msg = req.body.message;
        // carryout validation


        // send message
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

        console.log("Emailing: " + JSON.stringify(message));

        transporter.sendMail(message, (err, info) => {
            if (err) {
                console.log('Error occurred. ' + err.message);
                res.json({ success: false });
            }
            console.log('Message sent: %s', info.messageId);
            // Preview only available when sending through an Ethereal account
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
            res.json({ success: true });
        });

    });
}