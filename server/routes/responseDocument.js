//===================================
//All requirements

var express = require('express');
var router = express.Router();

var Response = require('../../Models/Response');

//=============================
//All post routes for sending and confirming data
router.post('/createResponse', function(request, response){
  var ingredients = [];
  for(var i = 0; i < request.body.recipients.length; i++){
    var responseRecipient = ({
      name: request.body.recipients.recipient[i].name,
      email: request.body.recipients.recipient[i].username,
      response_text: request.body.recipients.recipient[i].response_text,
      confirmation_text: request.body.recipients.recipient[i].confirmation_text,
      ingredients:[]
    });
    for (var j = 0; j < request.body.recipients.recipient.ingredients.length; j++){
      var responseIngredient = ({
        name: request.body.recipients.recipient.ingredients[j].name,
        quantity: request.body.recipients.recipient.ingredients[j].quantity,
        unit: request.body.recipients.recipient.ingredients[j].unit,
        confirmed_quantity: request.body.recipients.recipient.ingredients[j].confirmed_quantity
      });
      responseRecipient.ingredients.push(responseIngredient);
    }
    responseRecipients.push(responseRecipient);
  }
  var newresponse = new Response ({
    requestId: request.body.request.id,
    recipients: responseRecipients
  });

  newresponse.save(function(err){
    if(err){
      console.log(err);
    }
    response.sendStatus(200);
  });
});

//===================================
//Needed object for basic document creation
var data = {
  recipients: [{
    orgName: orgName,
    username: username,
    response_text: response_text,
    confirmation_text: confirmation_text,
    ingredients: [{
      name: name,
      quantity: quantity,
      unit: unit,
      confirmed_quantity: confirmed_quantity
    }]
  }],
  events: requestId
};

//===================================
//exporting the router
module.exports = router;
