//===================================
//All requirements

var express = require('express');
var router = express.Router();

var Request = require('../../Models/Request');

//===================================
//All post routes for sending and confirming data

router.post('/createRequest', function(request, response) {
        var events = [];
        var recipients = [];
        for(var i = 0; i < request.events.length; i++){
            var event = ({
                name: request.events[i].venues.venueName,
                date: request.events[i].venues.events.eventDate,
                all_salads: []
            })
            for (var j = 0; j < request.events[i].saladObject.length; j++){
                var salads = ({
                    amount: request.events[i].saladObject[j].amount,
                    salad: request.events[i].saladObject[j].salad
                })
                event.all_salads.push(salads);
            }
            events.push(event);
        }

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

//===================================
//Needed object for basic document creation

var data = {
    recipients: [{
        orgName: orgName,
        username: username
    }],
    events: [{
        name: venueName,
        date: eventDate,
        salads: [{
            amount: amount,
            salad: fullsaladobject
        }]
    }]
}

//===================================
//exporting the router

module.exports = router;
