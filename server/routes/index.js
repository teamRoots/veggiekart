<<<<<<< HEAD
var express = require('express');
var path = require('path');

var router = express.Router();

router.get('/', function(request, response){
  response.sendFile(path.join(__dirname, '../public/views/index.html'));
});

module.exports = router;
=======
//===================================
//All requirements

var express = require('express');
var path = require('path');
var router = express.Router();

//===================================
//All get routes that send to html view

router.get('/', function(request, response){
    response.sendFile(path.join(__dirname, '../public/views/index.html'));
});

//===================================
//Post routes for controller responses





//===================================
//exporting the router

module.exports = router;


>>>>>>> schema_mongoDB
