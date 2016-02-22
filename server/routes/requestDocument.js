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

router.get('/getRequests', function(request, response) {
    console.log('get request route hit');
    Request.find({}, function(err, requests) {
        if (err) {
            response.sendStatus(401)
        } else {
            // var eventsToSend = []
            // for (var i = 0; i < requests.length; i++) {
            //     var events = requests[i].event;
            //     for (var j = 0; j < events.length; j++) {
            //         console.log(events[j].name);
            //         eventsToSend.push(events[j].name)
            //     }
            // }
            response.send(requests);
        }
    })
})

//===================================
//exporting the router

module.exports = router;
