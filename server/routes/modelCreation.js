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
        var events = [];
        var recipient = [];
        for(var i = 0; i < request.events.length; i++){
            var event = ({
                name: request.events[i].venues.venueName,
                date: request.events[i].venues.events.eventDate,
                all_salads: []
            })
        }
        for (var j = 0; j < request.events[i].saladObject.length; j++){
            var all_salads = ({
                amount: request.events[i].saladObject[j].amount,
                salad: request.events[i].saladObject[j].salad
            })
            event.all_salads.push(all_salads);
        }
        events.push(event);


        for(i = 0; i < request.recipient.array.length; i++){
        var recipient = ({
            name: request.recipient.array[i].users.orgName,
            email: request.recipient.array[i].users.username
        })
        recipients.push(recipient);
    }

    var requestPage = new Request ({
        event: events,
        status: false,
        recipients: recipients
    })

    requestPage.save(function(err){
        if(err){
            console.log(err);
        }
        response.sendStatus(200);
    })
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
