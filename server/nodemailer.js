var nodemailer = require('nodemailer');

//create reusable transporter object using the default SMTP transporter
var transporter = nodemailer.createTransport('Gmail', {
  service: 'Gmail',
  auth: {
    user: process.env.USER,                  //environment variable for username
    pass: process.env.PASS                   //environmnet variable for password
  }
});

//setup e-mail data with unicode symbols
var mailOptions = {
  from: 'srjorgens@gmail.com',                //sender address
  to: 'srjorgens@gmail.com',                  //list of comma separated receivers
  subject: 'Test email',                      //subject loginService
  text: 'This is a VeggieKart test',          //plaintext body
  html: '<b>This is a VeggieKart test</b>'    //html body
};

//send email with defined transport object
var sendMessage = function() {
  transporter.sendMail(mailOptions, function(error, info){
    if(error){
      return console.log(error);
    }
    console.log('Message sent: ', info.response);
  });
};

// module.exports = sendMessage;
exports.sendMessage = sendMessage;
