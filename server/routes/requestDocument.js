//===================================
//All requirements

var express = require('express');
var router = express.Router();

var Request = require('../../Models/Request');

var nodemailer = require('nodemailer');
var sendEmail = require('../nodemailer');

//===================================
//All post routes for sending and confirming data

router.post('/', function(request, response) {
        var recipientsChecked = [];
        console.log('the request from the client is.....', request.body);
        var events = request.body.events;
        var recipients = request.body.recipients;
        var message = request.body.message;
        var summary = request.body.summary;

        for(var i = 0; i < recipients.length; i++){
            console.log(recipients[i].checked);
            if(recipients[i].checked === true){
                recipientsChecked.push(recipients[i]);
            }
        }

    var newRequest = new Request ({
        event: events,
        status: 'sent. no responses',
        recipients: recipientsChecked,
        message: message,
        summary: summary
    });

    newRequest.save(function(err, saved){
        if(err){
            console.log(err);
        }
        response.sendStatus(200);

        //pass dynamic data to generate customized email in nodemailer
        var emailSummary = "Summary of needed vegetables: " + "<br>";

        for (var i = 0; i < summary.length; i++) {
          emailSummary += summary[i].amount + " " + summary[i].unit + " of " + summary[i].ingredient_name + "<br>";
        }

        var emailIntro = 'Below is a list of items that are needed for the upcoming event.  Please select the link below and confirm how much you can contribute.';
        var emailMessage = saved.message;
        console.log('list of recipients: ', summary);
        // var gardenURL = 'localhost:3000/respond/' + saved._id;     // for future reference
        var gardenURL = 'localhost:3000/createRequests/getRequests/' + saved._id;

        // sendEmail.sendMessage(gardenURL, emailIntro, emailSummary, emailMessage);       //sends email message
    });
});

router.get('/getRequests', function(request, response) {
    console.log('get request route hit');
    Request.find({}, function(err, requests) {
        if (err) {
            response.sendStatus(401);
        } else {
            response.send(requests);
        }
    });
});

router.get('/getRequests/:id', function(request, response) {
    var id = request.params.id;
    console.log('get request id route hit, id: ', id);
    Request.findById(id, function(err, requests) {
        if (err) {
            response.sendStatus(401);
        } else {
            response.send(requests);
        }
    });
});

router.put('/updateRequest/:id', function(request, response) {
    var id = request.params.id;
    console.log('id sent to server:', id);
    console.log('request sent to server:', request.body);
    var updatedObject = request.body;

    Request.findById(id, function(error, objectToUpdate) {
        if(error) {
            response.sendStatus(401);
        } else {
            objectToUpdate.recipients = updatedObject.recipients;
            objectToUpdate.save(function(error) {
                if(error) {
                    response.sendStatus(401);
                } else {
                    response.send(objectToUpdate);
                }
            });
        }
    });
});


//===================================
//exporting the router

module.exports = router;
