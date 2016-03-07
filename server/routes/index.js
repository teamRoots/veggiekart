//===================================
//All requirements

var express = require('express');
var path = require('path');
var router = express.Router();

var Schedule = require('../../Models/Schedule');

//===================================
//All get routes that send to html view

router.get('/', function(request, response){
  response.sendFile(path.join(__dirname, '../public/views/index.html'));
});

router.get('/events', function(request, response){
  Schedule.find({}, function(error, events) {
    if (error) {
      console.log(error);
    } else {
      response.send(events);
    }
  });
});


//===================================
//exporting the router

module.exports = router;
