var express = require('express');
var User = require('../../Models/User');

var router = express.Router();

router.get('/recipients', function(request, response) {
  User.find({}, function(err, users) {

    var recipients = [];
    for (var i = 0; i < users.length; i++) {
      if(users[i].isAdmin === false){
        var recipient = {};
        recipient.name = users[i].firstName + " " + users[i].lastName;
        recipient.email = users[i].username;
        recipient.orgName = users[i].orgName;
        recipient.checked = true;
        recipients.push(recipient);
      }
    }
    response.send(recipients);
  });
});

module.exports = router;
