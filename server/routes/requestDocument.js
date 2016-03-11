//===================================
//All requirements

var express = require('express');
var router = express.Router();

var Request = require('../../Models/Request');

var nodemailer = require('nodemailer');
var sendEmail = require('../nodemailer');

//===================================
//All post routes for sending and confirming data

router.post('/', function(request, response){
  var recipientsChecked = [];
  var events = request.body.events;
  var recipients = request.body.recipients;
  var message = request.body.message;
  var summary = request.body.summary;

  for(var i = 0; i < recipients.length; i++){
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

    //build email summary
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

    //build email intro
    var emailIntro = 'Hello,' + '<br>' + '<br>' + 'Below is a list of items that are needed for the upcoming scheduled event(s).  Please click the link below to confirm how much your growers will contribute.' + '<br>' + '<br>';

    emailIntro += '<b>' + 'Event(s):' + '</b>' + '<br>';

    for (var k = 0; k < saved.event.length; k++){
      emailIntro += 'Location: ' + saved.event[k].event.location + '<br>' + 'Date: ' + saved.event[k].event.displayDate + '<br>' + 'Host: ' + saved.event[k].event.host + '<br>' + '<br>';
    }

    //build special message from Roots for the Home Team
    var emailMessage = "";

    //check if message was submitted on webpage and store
    if (saved.message) {
      emailMessage = '<b>' + 'Message from Roots for the Home Team:' + '</b>' + '<br>' + saved.message;
    }
    var emailSubject = 'New Request - Roots for the Home Team';

    //hard coded URL for TESTING, need to update with dynamic link for future URL
    // var gardenURL = '<b>' + 'Click here to confirm your contributions:' + '</b>' + '<br>' + 'http://localhost:3000/respond/' + saved._id;

    //dynamic link set to environment variable EM_RESPOND
    var gardenURL = '<b>' + 'Click here to confirm your contributions:' + '</b>' + '<br>' + process.env.EM_RESPOND + saved._id;


    //build html message
    var emailHTML = '<span>' + emailIntro + '<br>' + emailSummary + '<br>' + '<br>' + gardenURL + '<br>' + '<br>' + emailMessage + '</span>';

    //send email to recipients
    sendEmail.sendMessage(emailSubject, emailRecipients, emailHTML);
  });
});

router.get('/getRequests', function(request, response) {
  Request.find({}, function(err, requests) {
    if (err) {
        response.sendStatus(401);
    } else {
        response.send(requests);
    }
  });
});

router.post('/editRequest', function(request, response) {
  var id = request.body.idHolder;
  var recipientsChecked = [];
  var recipients = request.body.recipients;

  for(var i = 0; i < recipients.length; i++){
    if(recipients[i].checked === true){
      recipientsChecked.push(recipients[i]);
    }
  }

  Request.findById(id, function(err, oldRequests) {
    if (err) {
        response.sendStatus(401);
    } else {
      oldRequests.recipients = recipientsChecked;
      oldRequests.event = request.body.events;
      oldRequests.summary = request.body.summary;
      oldRequests.message = request.body.message;
      oldRequests.save(function(err, saved){
        if(err){
            console.log(err);
        } else {
          response.sendStatus(200);

          //send an email after updating request
          //build email summary
          var emailSummary = "<b>" + "Summary of needed vegetables: " + "</b>" + "<br>";

          //parse out summary of vegetables into text string for email body
          for (var i = 0; i < saved.summary.length; i++) {
            emailSummary += saved.summary[i].amount + " " + saved.summary[i].unit + " " + saved.summary[i].ingredient_name + "<br>";
          }

          //parse out list of recipients to be emailed
          var emailRecipients = "";

          for (var j = 0; j < saved.recipients.length; j++){
            emailRecipients += saved.recipients[j].email + ', ';
          }

          //remove last comma and space in recipient list string
          emailRecipients = emailRecipients.slice(0,-2);

          //build email intro
          var emailIntro = 'Hello,' + '<br>' + '<br>' + 'Below is an updated list of items that are needed for the upcoming scheduled event(s).  Please click the link below to confirm how much your growers will contribute.' + '<br>' + '<br>';
          emailIntro += '<b>' + 'Event(s):' + '</b>' + '<br>';

          for (var k = 0; k < saved.event.length; k++){
            emailIntro += 'Location: ' + saved.event[k].event.location + '<br>' + 'Date: ' + saved.event[k].event.displayDate + '<br>' + 'Host: ' + saved.event[k].event.host + '<br>' + '<br>';
          }

          var emailMessage = "";

          //check if message was submitted on webpage and store
          if (saved.message) {
            emailMessage = '<b>' + 'Message from Roots for the Home Team:' + '</b>' + '<br>' + saved.message;
          }

          var emailSubject = 'Updated Request - Roots for the Home Team';

          //hard coded URL for TESTING, need to update with dynamic link for future URL
          // var gardenURL = '<b>' + 'Click here to confirm your contributions:' + '</b>' + '<br>' + 'http://localhost:3000/respond/' + saved._id;

          //dynamic link set to environment variable EM_RESPOND
          var gardenURL = '<b>' + 'Click here to confirm your contributions:' + '</b>' + '<br>' + process.env.EM_RESPOND + saved._id;


          //build html message
          var emailHTML = '<span>' + emailIntro + '<br>' + emailSummary + '<br>' + '<br>' + gardenURL + '<br>' + '<br>' + emailMessage + '</span>';

          // send email to recipients
          sendEmail.sendMessage(emailSubject, emailRecipients, emailHTML);
        }
      });
    }
  });
});

router.get('/getRequests/:id', function(request, response){
  var id = request.params.id;
  Request.findById(id, function(err, requests){
    if (err) {
      response.sendStatus(401);
    } else {
      response.send(requests);
    }
  });
});

router.put('/updateRequest/:id', function(request, response){
  var id = request.params.id;
  var statusHolder = 0;
  var updatedObject = request.body.dataRequest;
  var currentOrg = '';

  for (var x = 0; x < request.body.dataRequest.recipients.length; x++){
    if (request.body.dataRequest.recipients[x].email == request.body.user.username){
      request.body.dataRequest.recipients[x].submittedResponse = true;
      currentOrg = request.body.dataRequest.recipients[x].orgName;
    }
  }

  Request.findById(id, function(error, objectToUpdate){
    if(error) {
      response.sendStatus(401);
    } else {
      for (var y = 0; y < request.body.dataRequest.recipients.length; y++){
        if (request.body.dataRequest.recipients[y].submittedResponse === true){
          statusHolder++;
        }
      }

      objectToUpdate.recipients = updatedObject.recipients;
      objectToUpdate.status = statusHolder + ' of ' + request.body.dataRequest.recipients.length + ' have responded';
      objectToUpdate.save(function(error){
        if(error){
          response.sendStatus(401);
        } else {
          response.send(objectToUpdate);
        }
      });
    }
  });

  //build and send User response summary email to Sue
  var emailSubject = 'User Response Notification - ' + currentOrg;
  var emailRecipients = 'sue@rootsforthehometeam.org';
  var emailUserMessage = '';

  //build emailIntro
  var emailIntro = 'Hello,' + '<br>' + '<br>' + currentOrg + ' has provided a response for the following scheduled event(s).' + '<br>' + '<br>';

  emailIntro += '<b>' + 'Event(s):' + '</b>' + '<br>';

  for (var h = 0; h < updatedObject.event.length; h++){
    emailIntro += 'Location: ' + updatedObject.event[h].event.location + '<br>' + 'Date: ' + updatedObject.event[h].event.displayDate + '<br>' + 'Host: ' + updatedObject.event[h].event.host + '<br>' + '<br>';
  }

  //build emailSummary
  var emailSummary = '<b>' + 'Summary of required items: ' + '</b>' + '<br>';

  for (var i = 0; i < updatedObject.summary.length; i++){
    emailSummary += updatedObject.summary[i].amount + ' ' + updatedObject.summary[i].unit + ' ' + updatedObject.summary[i].ingredient_name + '<br>';
  }

  //cycle through all recipients and return the summary of items provided by the User that responded
  // emailSummary += '<br>' + '<b>' + 'Summary of items to be provided: ' + '</b>' + '<br>';
  emailSummary += '<br>' + '<br>' + '<b>' + 'Summary of items to be provided: ' + '</b>' + '<br>';
  var unitMeasure = '';
  for (var j = 0; j < updatedObject.recipients.length; j++){
    if (updatedObject.recipients[j].commitments){
      emailSummary += updatedObject.recipients[j].orgName + ': ' + '<br>';
      for (var veggie in updatedObject.recipients[j].commitments){
        for (var k = 0; k < updatedObject.summary.length; k++){
          if (updatedObject.summary[k].ingredient_name == veggie){
            unitMeasure = updatedObject.summary[k].unit;
          }
        }
        //check for null values if quantity was previously added and removed from DB
        if(updatedObject.recipients[j].commitments[veggie].quantity){
          emailSummary += updatedObject.recipients[j].commitments[veggie].quantity + ' ' + unitMeasure + ' ' + veggie + '<br>';
        }

        //re-set UOM
        unitMeasure = '';
      }

      //include message from Users response if they provided one
      //check if message was submitted on webpage and store
      if (updatedObject.recipients[j].toAdminMessage){
        emailUserMessage = '<br>' + '<br>' + '<b>' + 'Message from ' + currentOrg + ':' + '</b>' + '<br>' + updatedObject.recipients[j].toAdminMessage + '<br>' + '<br>';
      }
      emailUserMessage += '<b>' + 'Note: ' + '</b>' + updatedObject.status + '.';
    }
  }

  //build html message
  var emailHTML = '<span>' + emailIntro + '<br>' + emailSummary + emailUserMessage + '</span>';

  //send request confirmation email of all grower confirmations to Sue
  sendEmail.sendMessage(emailSubject, emailRecipients, emailHTML);
});

router.put('/confirmRequest/:id', function(request, response){
  var id = request.params.id;
  var updatedObject = request.body;

  Request.findById(id, function(error, objectToUpdate){
    if(error){
      response.sendStatus(401);
    } else {
      objectToUpdate.recipients = updatedObject.recipients;
      objectToUpdate.save(function(error){
        if(error){
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
  var emailIntro = 'Hello,' + '<br>' + '<br>' + 'Below is a summary of the confirmed amounts of produce to be provided for the following scheduled event(s).' + '<br>' + '<br>';

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
    for (var veggie in updatedObject.recipients[j].confirmations){
      for (var k = 0; k < updatedObject.summary.length; k++){
        if (updatedObject.summary[k].ingredient_name == veggie){
          unitMeasure = updatedObject.summary[k].unit;
        }
      }
      //check for null values if quantity was previously added and removed from DB
      if(updatedObject.recipients[j].confirmations[veggie].quantity){
        emailSummary += updatedObject.recipients[j].confirmations[veggie].quantity + ' ' + unitMeasure + ' ' + veggie + '<br>';
      }
      unitMeasure = '';
    }
    emailSummary += '<br>';
  }

  //build html message
  var emailHTML = '<span>' + emailIntro + '<br>' + emailSummary + '</span>';

  //send request confirmation email of all grower confirmations to Sue
  sendEmail.sendMessage(emailSubject, emailRecipients, emailHTML);

  //build and send request confirmation email to each Recipient
  emailSubject = 'Request Confirmation with Roots for the Home Team';
  //cycle through all recipients and add their confirmed items and quantities to Summary
  for (var l = 0; l < updatedObject.recipients.length; l++){
    emailSummary = '<b>' + 'Summary of confirmed items by ' + updatedObject.recipients[l].orgName + ': ' + '</b>' + '<br>';
    unitMeasure = '';
    for (var veggie in updatedObject.recipients[l].confirmations){
      for (var m = 0; m < updatedObject.summary.length; m++){
        if (updatedObject.summary[m].ingredient_name == veggie){
          unitMeasure = updatedObject.summary[m].unit;
        }
      }
      //check for null values if quantity was previously added and removed from DB
      if(updatedObject.recipients[l].confirmations[veggie].quantity){
        emailSummary += updatedObject.recipients[l].confirmations[veggie].quantity + ' ' + unitMeasure + ' ' + veggie + '<br>';
      }
      unitMeasure = '';
    }
    emailSummary += '<br>';

    //set recipients email address
    emailRecipients = updatedObject.recipients[l].email;

    //check for message from Sue and add personalized message to grower
    var emailMessage = '';

    if (updatedObject.recipients[l].fromAdminMessage){
      emailMessage = '<b>' + 'Message from Roots for the Home Team:' + '</b>' + '<br>' + updatedObject.recipients[l].fromAdminMessage;
    }

    //build html message
    emailHTML = '<span>' + emailIntro + '<br>' + emailSummary + '<br>' + emailMessage + '</span>';

    //send request confirmation email to each grower
    sendEmail.sendMessage(emailSubject, emailRecipients, emailHTML);
  }
});

router.post('/findOldRequest', function(request, response){
  var id = request.body.idHolder;
  if (id === ''){
    response.send('no assigned Id');
  } else {
    Request.findById(id, function(err, requests){
      if(err){
        response.sendStatus(401);
      } else {
        response.send(requests);
      }
    });
  }
});

router.post('/deleteRequest', function(request, response){
  Request.remove({_id: request.body.id}, function(err, res){
    if (err){
      console.log(err);
    }else {
      response.send('request deleted');
    }
  });
});

//===================================
//exporting the router
module.exports = router;
