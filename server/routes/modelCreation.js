//===================================
//All requirements

var express = require('express');
var router = express.Router();

//===================================
//All Models for data access

var Salads = require('../../Models/Salad');
var Request = require('../../Models/Request');
var Response = require('../../Models/Response');

//+++++++++++++++++++++++++++++++++++++
////Do we need to bring in other database for this???????
//+++++++++++++++++++++++++++++++++++++

//===================================
//Model in database creation

router.post('/createRequest', function(request, response) {
    Request.create({
        for(var i = 0; i < request.event.array.length; i++){
        event: [{
            name: request.event.array[i].venues.venueName,
            date: request.event.array[i].venues.events.eventDate,
            for var j = 0; j < request.array[i].saladObject.length; j++){
            all_salads: [{
                amount: request.event.array[i].saladObject[j].amount,
                salad: request.event.array[i].saladObject[j].salad
            }]
            }
        }]

        }
        for(var i = 0; i < request.recipients.array.length; i++){
            recipients: [{
            name: request.recipients.array[i].users.orgName,
            email: request.recipients.array[i].users.username
        }]
        status: false


});
});

router.post('/createSalad', function(request, response) {
    Salads.create({

    });
});

router.post('/createResponse', function(request, response) {
    Response.create({

    });
});
//===================================
//exporting the router

module.exports = router;
