app.factory('responseService', ['$http', '$location', 'loginService', function($http, $location, loginService){
  var data = {
    exitConfirm: false,
    confirmRequest: false,
    confirmIcon: false,
    deleteError: false,
    deleteIcon: false,
    confirmError: false
  };
  data.fromAdminMessages =[];      //is this needed?  it is needed inside loadRequest to refresh messages when changing from request to request

  var confirmDelete = function() {
    data.deleteError = true;
    data.deleteMessage = 'Are you sure?';
  };

  var loadRequest = function(id) {
    $http.get('/createRequest/getRequests/' + id).then(function(response) {
      data.request = response.data;
      data.eventsInfo = [];
      data.fromAdminMessages = [];      //for testing a bug; wasn't initializing when changing requests

      var events = response.data.event;
      var recipients = response.data.recipients;

      for (var i = 0; i < events.length; i++) {
        data.eventsInfo.push(events[i].event);
      }

      //if existing toAdminMessage, then grab that to populate the text field
      for (var i = 0; i < recipients.length; i++) {
        if (recipients[i].toAdminMessage !== undefined) {
          data.toAdminMessage = recipients[i].toAdminMessage;
        }
      }

      for (var i = 0; i < recipients.length; i++) {
        if (recipients[i].fromAdminMessage !== undefined) {
          var messageToPush =
            {
              name: recipients[i].name,
              message: recipients[i].fromAdminMessage
            };
          data.fromAdminMessages.push(messageToPush);
        }
      }
    });
  };

  //validated the response and display modal confirmation
  var validateResponse = function(){
    data.confirmRequest = true;
    data.confirmMessage = 'Are you sure? ';
    recipients = data.request.recipients;

    for (var i = 0; i < recipients.length; i++){
      if (recipients[i].email === loginService.user.username) {
        if (typeof recipients[i].commitments === 'undefined' || recipients[i].commitments === null) {
          data.confirmMessage += 'No vegetables added. ';
          return;
        }
      }
    }

    if (typeof data.toAdminMessage === 'undefined' || data.toAdminMessage === null || data.toAdminMessage === '') {
      data.confirmMessage += 'No message added.';
    }

  };

  //sends the response to admin
  var sendResponse = function(user){

    //add message to requests
    for (var i = 0; i < data.request.recipients.length; i++) {
      if (data.request.recipients[i].email === loginService.user.username){
        data.request.recipients[i].toAdminMessage = data.toAdminMessage;
      }
    }

    var objectHolder = {
      dataRequest: data.request,
      user: user
    };

    //send request to server
    var id = data.request._id;

    $http.put('/createRequest/updateRequest/' + id, objectHolder).then(function(response) {
      console.log(response);
    });
    data.exitConfirm = true;
  };

  var confirmCheck = function() {
    data.confirmError = true;
    data.confirmErrorMessage = 'Are you sure?';
  };

  var confirmRequest = function(){
    data.confirmIcon = true;
    var id = data.request._id;

    $http.put('/createRequest/confirmRequest/' + id, data.request).then(function(response) {
      data.confirmError = false;
      data.confirmErrorMessage = '';
      $location.path(('/admin/dashboard'));
    });
  };

  var addMessage = function() {

    //check that all inputs are as expected
    if (typeof this.messageRecipient == 'undefined' || this.messageRecipient === null) {
      data.addMessageError = true;
      data.addMessageErrorMessage = 'Please choose a recipient';
      return;
    }

    if (typeof this.message == 'undefined' || this.message === null || this.message.length < 1) {
      data.addMessageError = true;
      data.addMessageErrorMessage = 'Please add a message for ' + this.messageRecipient.name;
      return;
    }

    //add message
    var name = this.messageRecipient.name;
    var message = this.message;
    var recipients = data.request.recipients;
    var messageToShow = {
      name: name,
      message: message
    };

    data.fromAdminMessages.push(messageToShow);

    for (var i = 0; i < recipients.length; i++) {
      if (recipients[i].name == name) {
        recipients[i].fromAdminMessage = message;
      }
    }
  };

  var deleteRequest = function(id){
    data.deleteIcon = true;

    var idHolder = {
      id: id
    };

    $http.post('/createRequest/deleteRequest', idHolder).then(function(response) {
      data.deleteIcon = false;
      data.deleteError = false;
      $location.path('/admin/dashboard');
    });
  };

  return {
    loadRequest: loadRequest,
    deleteRequest: deleteRequest,
    sendResponse: sendResponse,
    confirmRequest: confirmRequest,
    confirmDelete: confirmDelete,
    confirmCheck: confirmCheck,
    addMessage: addMessage,
    validateResponse: validateResponse,
    data: data
  };
}]);
