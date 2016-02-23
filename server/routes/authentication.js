//===================================
//All requirements

var express = require('express');
var passport = require('passport');
var router = express.Router();

//===================================
//All get routes to direct location when authenticating

router.get('/success', function(request, response){
    console.log('success request', request.user);
    response.send(request.user);
});

router.get('/failure', function(request, response){
    console.log('failure request', request.user);
    response.send('failure');
});

//===================================
//post call for passport authentication

router.post('/login', passport.authenticate('local', {
    successRedirect: '/authenticate/success', failureRedirect:'/authenticate/failure'
}));

//===================================
//exporting the router

module.exports = router;
