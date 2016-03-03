//send email with defined transport object
var sendMessage = function(emailSubject, emailRecipients, emailHTML) {

  var nodemailer = require('nodemailer');

  //create reusable transporter object using the default SMTP transporter
  // var transporter = nodemailer.createTransport('Gmail', {
  var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EM_USER,                  //environment variable for username
      pass: process.env.EM_PASS                   //environmnet variable for password
    }
  });

  //setup e-mail data with unicode symbols
  var mailOptions = {
    from: 'rootsftht@gmail.com',                //sender address
    // to: emailRecipients,                                                 //uncomment to
//HOT! DON'T TOUCH!!!!
    // use live recipients
    to: 'rootsftht@gmail.com, srjorgens@gmail.com, scottjorgens@aol.com',      //list of comma separated recipients
    subject: emailSubject,                      //subject loginService
    text: '',                                   //plaintext body
    html: emailHTML    //html body
  };

  transporter.sendMail(mailOptions, function(error, info){
    if(error){
      return console.log('email error ' + error + ' with username ' + process.env.EM_USER + ' and password ' + process.env.EM_PASS);
    }
    console.log('Message sent: ', info.response);
  });
};

exports.sendMessage = sendMessage;
