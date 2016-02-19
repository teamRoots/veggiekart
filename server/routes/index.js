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
//exporting the router

module.exports = router;
