//===================================
//All requirements

var express = require('express');
var passport = require('passport');
var router = express.Router();

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
//exporting the router

module.exports = router;