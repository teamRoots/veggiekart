app.factory('responseService', ['$http', '$location', 'loginService', function($http, $location, loginService){
  var data = {
    confirmRequest: false,
    confirmIcon: false
  };
  data.fromSueMessages =[];

  var loadRequest = function(id) {
    console.log('loadRequest hit', id);
    $http.get('/createRequest/getRequests/' + id).then(function(response) {
      data.request = response.data;
      var events = response.data.event;
      var recipients = response.data.recipients;
      console.log(recipients);
      data.eventsInfo = [];

      for (var i = 0; i < events.length; i++) {
        data.eventsInfo.push(events[i].event);
      }

      for (var i = 0; i < recipients.length; i++) {
        if (recipients[i].fromSueMessage !== undefined) {
          var messageToPush = {
                                name: recipients[i].name,
                                message: recipients[i].fromSueMessage
          }
          console.log(messageToPush);
          data.fromSueMessages.push(messageToPush);
        }
      }
      console.log('data.eventsInfo', data.eventsInfo);
    })
  };

  //validated the response and display modal confirmation
  var validateResponse = function(){
    data.confirmRequest = true;
    data.confirmMessage = 'Are you sure? '
    console.log('in the validateResponse function');
    console.log('data.request is ', data.request);
    console.log('loginService.user._id is ', loginService.user);
    recipients = data.request.recipients;

    for (var i = 0; i < recipients.length; i++){
      if (recipients[i].email === loginService.user.username) {
        if (typeof recipients[i].commitments === 'undefined' || recipients[i].commitments === null) {
          data.confirmMessage += 'No vegetables added. ';
          return;
        }
      };
    };

    console.log('data.request.message is ', data.request.message);
    if (typeof data.request.message === 'undefined' || data.request.message === null || data.request.message === '') {
      console.log('in the IF');
      data.confirmMessage += 'No message added.';
    }

  };

  //sends the response to admin
  var sendResponse = function(){
    console.log('response to send:', data.request._id);
    var id = data.request._id;
    $http.put('/createRequest/updateRequest/' + id, data.request).then(function(response) {
      console.log(response);
    })
  }

  var confirmRequest = function(){
    // console.log('response to send:', data.request._id);
    console.log('data.request:', data.request);
    var id = data.request._id;
    $http.put('/createRequest/confirmRequest/' + id, data.request).then(function(response) {
      console.log(response);
    })
  }

  var addMessage = function() {

    //check that all inputs are as expected
    if (typeof this.messageRecipient == 'undefined' || this.messageRecipient == null) {
      data.addMessageError = true;
      data.addMessageErrorMessage = 'Please choose a recipient';
      return;
    };

    if (typeof this.message == 'undefined' || this.message == null || this.message.length < 1) {
      data.addMessageError = true;
      data.addMessageErrorMessage = 'Please add a message for ' + this.messageRecipient.name;
      return;
    };

    //add message
    var name = this.messageRecipient.name;
    var message = this.message;
    var recipients = data.request.recipients;
    var messageToShow = {
                          name: name,
                          message: message
                          }

    data.fromSueMessages.push(messageToShow);

    for (var i = 0; i < recipients.length; i++) {
      if (recipients[i].name == name) {
        recipients[i].fromSueMessage = message;
        console.log(recipients[i]);

      }
    }
  }

  return {
    loadRequest: loadRequest,
    sendResponse: sendResponse,
    confirmRequest: confirmRequest,
    addMessage: addMessage,
    validateResponse: validateResponse,
    data: data
  }

}]);
