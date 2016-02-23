//Service for admin to create new requests
app.factory('createRequestService', ['$http', function($http){
  var data = {
    events: [],
    salads: [],
    saladCounterArray: [{id: 0}]
  };
  var newEvent = {
    salads: []
  };
  var eventCounter = 0;
  var saladCounter = 0;
  var request = {};

  //adds event to the current request
  var addEvent = function(){
    data.events.push({
      event: newEvent.event,
      date: newEvent.event.date,
      salads: newEvent.salads.splice(0),
      id: eventCounter
    });
    console.log('newEvent is ', newEvent);
    console.log('data.events is ', data.events);
    eventCounter++;
    saladCounter = 1;
  }

  //adds salad to the current event
  var addSalad = function(){
    saladCounter++;
    data.saladCounterArray.push({id: saladCounter});
    // data.salads.push({name: newEvent.salad, quantity: newEvent.saladQuantity});
  }

  //gets the recipients from the server
  var getRecipients = function(){
    $http.get('/requestRecipients/recipients').then(function(response) {
      data.recipients = response.data;
    })
  }

  //saves the request to database on initial button click
  var saveRequest = function(){
    request = {
        recipients: data.recipients,
        events: data.events,
        message: data.message
    }
    console.log('sending request to server ', request);
    $http.post('/createRequest', request).then(function(response){
      console.log('response from da server is....... ', response);
    })
  }

  var loadRequests = function() {
    $http.get('/createRequest/getRequests').then(function(response) {
      data.requests = response.data;
    });
  };


  //sends the request out to receipients on confirmation dialog click
  var sendRequest = function(){

  }


    return {
    addEvent: addEvent,
    addSalad: addSalad,
    getRecipients: getRecipients,
    saveRequest: saveRequest,
    sendRequest: sendRequest,
    loadRequests: loadRequests,
    newEvent: newEvent,
    data: data
  };

}]);
