'use strict';
var nodemailer = require('nodemailer');


module.exports = function(mailOptions){

// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // secure:true for port 465, secure:false for port 587
    auth: {
        user: process.env.MAIL_EMAIL,
        pass: process.env.MAIL_PASS
    }
});

// setup email data with unicode symbols
// var mailOptions = {
//     from: '"Fred Foo 👻" <ggsipu.jobs@ggsipu.com>', // sender address
//     to: 'surender7790@gmail.com', // list of receivers
//     subject: 'Hello ✔', // Subject line
//     //text: 'Hello world ?', // plain text body
//     html: '<b>Hello world ? This is surender</b>' // html body
// };

// send mail with defined transport object
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Message %s sent: %s', info.messageId, info.response);
});


}
