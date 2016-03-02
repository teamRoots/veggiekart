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
        //underline first line of summary
        // var emailSummary = '<a style=\"text-decoration: underline\;\">' + "Summary of needed vegetables:" + '</a>' + " " + "<br>";

        //bold the first line of summary
        var emailSummary = "<b>" + "Summary of needed vegetables: " + "</b>" + "<br>";

        //parse out summary of vegetables into text string for email body
        for (var i = 0; i < summary.length; i++) {
          emailSummary += summary[i].amount + " " + summary[i].unit + " " + summary[i].ingredient_name + "<br>";
        }

        //parse out list of recipients to be emailed
        var emailRecipients = "";

        for (var j = 0; j < saved.recipients.length; j++){
          emailRecipients += saved.recipients[j].email + ', ';
        }

        //remove last comma and space in recipient list string
        emailRecipients = emailRecipients.slice(0,-2);

        var emailIntro = 'Below is a list of items that are needed for the upcoming event.  Please select the link below and confirm how much your team can contribute.';
        var emailMessage = "";

        //check if message was submitted on webpage and store
        if (saved.message) {
          emailMessage = saved.message;
        }
        var emailSubject = 'New Request - Roots for the Home Team';
        console.log('list of recipients: ', emailRecipients);

        //var gardenURL = 'localhost:3000/respond/' + saved._id;     // for future reference
        var gardenURL = 'localhost:3000/createRequests/getRequests/' + saved._id;

        //build html message
        var emailHTML = '<span>' + emailIntro + '<br>' + '<br>' + emailSummary + '<br>' + '<br>' + 'http://' + gardenURL + '<br>' + '<br>' + emailMessage + '</span>';

        // sendEmail.sendMessage(emailSubject, emailRecipients, emailIntro, emailSummary, emailMessage, gardenURL);       //sends email message
        sendEmail.sendMessage(emailSubject, emailRecipients, emailHTML);       //sends email message
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

router.post('/editRequest', function(request, response) {
    console.log('get request route hit', request.body);
    var id = request.body.idHolder;
    Request.findById(id, function(err, oldRequests) {
        if (err) {
            response.sendStatus(401);
        } else {
            console.log('oldRequests', oldRequests);
            oldRequests.recipients = request.body.recipients;
            oldRequests.event = request.body.events;
            oldRequests.summary = request.body.summary;
            oldRequests.message = request.body.message;
            oldRequests.save(function(err, saved){
                if(err){
                    console.log(err);
                }else {
                response.sendStatus(200);
                }
            });
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

router.put('/confirmRequest/:id', function(request, response) {
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

    //build and send request confirmation summary email to Sue
    var emailSubject = 'Request Confirmation Summary';

    var emailRecipients = 'sue@rootsforthehometeam.org';

    //build emailIntro
    var emailIntro = 'Below is a summary of the confirmed amounts of produce to be provided for the following scheduled event(s).' + '<br>' + '<br>';

    emailIntro += '<b>' + 'Event(s):' + '</b>' + '<br>';

    for (var h = 0; h < updatedObject.event.length; h++){
      emailIntro += 'Location: ' + updatedObject.event[h].event.location + '<br>' + 'Date: ' + updatedObject.event[h].event.displayDate + '<br>' + 'Host: ' + updatedObject.event[h].event.host + '<br>' + '<br>';
    }

    //build emailSummary
    var emailSummary = '<b>' + 'Summary of required items: ' + '</b>' + '<br>';

    for (var i = 0; i < updatedObject.summary.length; i++){
      emailSummary += updatedObject.summary[i].amount + ' ' + updatedObject.summary[i].unit + ' ' + updatedObject.summary[i].ingredient_name + '<br>';
    }

    //cycle through all recipients and add their confirmed items and quantities to Summary
    emailSummary += '<br>' + '<b>' + 'Summary of confirmed items by grower: ' + '</b>' + '<br>';
    var unitMeasure = '';
    for (var j = 0; j < updatedObject.recipients.length; j++){
      emailSummary += updatedObject.recipients[j].orgName + ': ' + '<br>';
      for (var veggie in updatedObject.recipients[j].confirmations) {
        for (var k = 0; k < updatedObject.summary.length; k++){
          if (updatedObject.summary[k].ingredient_name == veggie){
            unitMeasure = updatedObject.summary[k].unit;
          }
        }
        emailSummary += updatedObject.recipients[j].confirmations[veggie].quantity + ' ' + unitMeasure + ' ' + veggie + '<br>';
        unitMeasure = '';
      }
      emailSummary += '<br>';
    }

    //build html message
    var emailHTML = '<span>' + emailIntro + '<br>' + emailSummary + '</span>';

    //send request confirmation email of all grower confirmations to Sue
    // sendEmail.sendMessage(emailSubject, emailRecipients, emailHTML);

    //build and send request confirmation email to each Recipient
    emailSubject = 'Request Confirmation with Roots for the Home Team';
    //cycle through all recipients and add their confirmed items and quantities to Summary
    for (var l = 0; l < updatedObject.recipients.length; l++){
      emailSummary = '<b>' + 'Summary of confirmed items by ' + updatedObject.recipients[l].orgName + ': ' + '</b>' + '<br>';
      unitMeasure = '';
      for (var veggie in updatedObject.recipients[l].confirmations) {
        for (var m = 0; m < updatedObject.summary.length; m++){
          if (updatedObject.summary[m].ingredient_name == veggie){
            unitMeasure = updatedObject.summary[m].unit;
          }
        }
        emailSummary += updatedObject.recipients[l].confirmations[veggie].quantity + ' ' + unitMeasure + ' ' + veggie + '<br>';
        unitMeasure = '';
      }
      emailSummary += '<br>';

      //set recipients email address
      var emailRecipients = "";

      emailRecipients = updatedObject.recipients[l].email;

      //build html message
      var emailHTML = '<span>' + emailIntro + '<br>' + emailSummary + '</span>';

      console.log('emailHTML: ', emailHTML);
      console.log('emailRecipients: ', emailRecipients);

      //send request confirmation email of all grower confirmations to Sue
      sendEmail.sendMessage(emailSubject, emailRecipients, emailHTML);
    }
});

router.post('/findOldRequest', function(request, response) {
    var id = request.body.idHolder;
    console.log('get request id route hit, id: ', id.idHolder);
    if (id === ''){
        response.send('no assigned Id');
    }
    else{
    Request.findById(id, function(err, requests) {
        if (err) {
            console.log('asdfasd',requests);
            response.sendStatus(401);
        } else {
            response.send(requests);
        }
    });
    }
});


//===================================
//exporting the router

module.exports = router;
