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
