//===================================
//All requirements

var express = require('express');
var router = express.Router();

//===================================
//All Models for data access

var Salad = require('../../Models/Salad');
var Request = require('../../Models/Request');
var Response = require('../../Models/Response');

//+++++++++++++++++++++++++++++++++++++
////Do we need to bring in other database for this???????
//+++++++++++++++++++++++++++++++++++++

//===================================
//Model in database creation

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

router.post('/createSalad', function(request, response) {
    var ingredients = [];
    for(i = 0; i < request.body.ingredients.length; i++){
    var ingredient = ({
        ingredient_name: request.body.ingredients[i].ingredient_name,
        amount: request.body.ingredients[i].amount,
        unit: request.body.ingredients[i].unit
    })
    ingredients.push(ingredient);
}

var newsalad = new Salad ({
    name: request.body.name,
    ingredients: ingredients,
})

newsalad.save(function(err){
    if(err){
        console.log(err);
    }
    response.sendStatus(200);
})
});

router.post('/createResponse', function(request, response) {
    var ingredients = [];
    for(var i = 0; i < request.body.recipients.length; i++){
        var responseRecipient = ({
            name: request.body.recipients.recipient[i].name,
            email: request.body.recipients.recipient[i].username,
            response_text: request.body.recipients.recipient[i].response_text,
            confirmation_text: request.body.recipients.recipient[i].confirmation_text,
            ingredients:[]
        })
        for (var j = 0; j < request.body.recipients.recipient.ingredients.length; j++){
            var responseIngredient = ({
                name: request.body.recipients.recipient.ingredients[j].name,
                quantity: request.body.recipients.recipient.ingredients[j].quantity,
                unit: request.body.recipients.recipient.ingredients[j].unit,
                confirmed_quantity: request.body.recipients.recipient.ingredients[j].confirmed_quantity
            })
            responseRecipient.ingredients.push(responseIngredient);
        }
        responseRecipients.push(responseRecipient);
    }
    var newresponse = new Response ({
        requestId: request.body.request.id,
        recipients: responseRecipients
    })

    newresponse.save(function(err){
        if(err){
            console.log(err);
        }
        response.sendStatus(200);
    })

});

//===================================
//exporting the router

module.exports = router;
