//===================================
//All requirements

var express = require('express');
var router = express.Router();

var Request = require('../../Models/Request');

//===================================
//All post routes for sending and confirming data

router.post('/', function(request, response) {
        console.log('the request from the client is.....', request.body);
        var events = request.body;
        var recipients = [];

    var newRequest = new Request ({
        event: events,
        status: false,
        recipients: recipients
    })

    newRequest.save(function(err){
        if(err){
            console.log(err);
        }
        response.sendStatus(200);
    })
});

//===================================
//exporting the router

module.exports = router;
