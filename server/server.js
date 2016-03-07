//This is the start of the server
//================================================
//List of all the required modules and routes
require('dotenv').config();                 //brings in local environment variables that are not pushed to github (dotenv.env is included in .gitignore)
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var passport = require('./authentication');

//=================================================
// Routes

var authenticate = require('./routes/authentication');
var index = require('./routes/index');
var salad = require('./routes/saladDocument');
var createRequest = require('./routes/requestDocument');
var recipients = require('./routes/recipients');
var respond = require('./routes/respond.js');
var app = express();

/////////////////////////////////////////////////////////
/////////////////////  for testing //////////////////////
/////////////////////////////////////////////////////////
// console.log('User Env variable: ', process.env.EM_USER);


// var nodemailer = require('nodemailer');
// var sendEmail = require('./nodemailer');
// sendEmail.sendMessage();           //sends email message
/////////////////////////////////////////////////////////

//=================================================
// body parser middleware

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//=================================================
//Starting connection to Mongo Database either best choice or local host

var mongoURI = process.env.DATABASE_URL || 'mongodb://localhost:27017/veggiekart';
var mongoDB = mongoose.connect(mongoURI).connection;

mongoDB.on('error', function(err){
  console.log('MongoDB error: ', err);
});

mongoDB.on('open', function(){
  console.log('MongoDB connected!');
});

//=================================================
// use and configure server sessions

app.use(session({
  secret: 'secret',
  key: 'user',
  resave: true,
  saveUninitialized: false,
  cookie: {
    maxAge: 600000,
    secure: false
  }
}));

//=================================================
// initialize passport

passport.init(app);

//=================================================
// Middleware and routes
app.use(express.static('server/public'));
app.use('/salad', salad); 
app.use('/authenticate', authenticate);
app.use('/createRequest', createRequest);
app.use('/requestRecipients', recipients);
app.use('/respond', respond);
app.use('/', index);

//=================================================
// Initiate server
var server = app.listen(process.env.PORT || 3000, function(){
  var port = server.address().port;
  console.log('listening on port', port);
});
