//===================================
//All requirements

var express = require('express');
var passport = require('passport');
var path = require('path');
var mongoose = require('mongoose');
var router = express.Router();

//===================================
//All Models for data access

var Salads = require('../../Models/Salad');
var Request = require('../../Models/Request');

//+++++++++++++++++++++++++++++++++++++
////Do we need to bring in other database for this???????
//+++++++++++++++++++++++++++++++++++++



//===================================
//All get routes that send to html view

router.get('/', function(request, response){
    response.sendFile(path.join(__dirname, '../public/views/index.html'));
});

//===================================
//All post routes for sending data

router.post('/sendRequest', function(request, response){

});

router.post('/sendResponse', function(request, response){

});

router.post('/confirmRequest', function(request, response){

});

//===================================
//All get routes to direct location when authenticating

router.get('/success', function(request, response){
    response.send('success');
});

router.get('/failure', function(request, response){
    response.send('failure');
});

//===================================
//post call for passport authentication

router.post('/', passport.authenticate('local', {
    successRedirect: '/success', failureRedirect:'/failure'
}));

//===================================
//Model in database creation

router.post('/createRequest', function(request, response) {
    Request.create({

    });
});

router.post('/createSalad', function(request, response) {
    Salads.create({

    });
});
//===================================
//exporting the router

module.exports = router;