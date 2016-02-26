//send email with defined transport object
var sendMessage = function(gardenURL, emailIntro, emailSummary, emailMessage) {
// var sendMessage = function(gardenURL, emailIntro, emailMessage) {

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
    to: 'rootsftht@gmail.com',                  //list of comma separated receivers
    subject: 'Test email',                      //subject loginService
    text: 'This is a VeggieKart test',          //plaintext body
    html: '<b>' + emailIntro + '<br>' + '<br>' + emailSummary + '<br>' + '<br>' + 'http://' + gardenURL + '<br>' + '<br>' + emailMessage + '</b>'    //html body
    // html: '<b>' + emailIntro + '<br>' + '<br>' + gardenURL + '<br>' + '<br>' + emailMessage + '</b>'    //html body
  };

  transporter.sendMail(mailOptions, function(error, info){
    if(error){
      return console.log('email error ' + error + ' with username ' + process.env.EM_USER + ' and password ' + process.env.EM_PASS);
    }
    console.log('Message sent: ', info.response);
  });
};

// module.exports = sendMessage;
exports.sendMessage = sendMessage;
