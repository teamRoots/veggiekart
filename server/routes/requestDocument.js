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
        console.log('saved is ', saved._id);
        var emailMessage = 'aaaah email';
        var gardenURL = 'localhost:3000/farm/response/' + saved._id;
        sendEmail.sendMessage(gardenURL);           //sends email message
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
            objectToUpdate = updatedObject;
            Request.save(function(error) {
                if(error) {
                    response.sendStatus(401);
                } else {
                    response.send(objectToUpdate);
                }
            })
        }
    })
});
    // Request.findOneAndUpdate({_id: id}, updatedObject, {upsert: true, multi: true, new: true}, function(err, updatedRequest) {
    //     if (err) {
    //         response.sendStatus(401);
    //     } else {
    //         response.send(updatedRequest);
    //     }
//     })
// });

//===================================
//exporting the router

module.exports = router;
