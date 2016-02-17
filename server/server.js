<<<<<<< HEAD
var express = require('express');

// Routes
var index = require('./routes/index');

var app = express();

// Middleware and routes
app.use(express.static('server/public'));
app.use('/', index);

// Initiate server
var server = app.listen(process.env.PORT || 3000, function(){
  var port = server.address().port;
  console.log('listening on port', port);
});
=======
//This is the start of the server
//================================================
//List of all the required modules and routes

var passport = require('./authentication');
var session = require('express-session');






//=================================================
//Starting connection to Mongo Database either best choice or local host

var mongoURI = process.env.DATABASE_URL || 'mongodb://localhost:27017/rootsforthehometeam';
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
    secret: process.env.SECRET,
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
>>>>>>> schema_mongoDB
