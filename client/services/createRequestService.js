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
    console.log(newEvent.salads);
    data.events.push({
      location: newEvent.location,
      // date: new Date,
      // salads: newEvent.salads.splice(0),
      // id: eventCounter
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
    console.log('saladCounter is ', saladCounter);
    console.log('data.saladCounterArray is ', data.saladCounterArray);
    // data.salads.push({name: newEvent.salad, quantity: newEvent.saladQuantity});
  }

  //gets the recipients from the server
  var getRecipients = function(){
    console.log('getRecipients hit');
    $http.get('/requestRecipients/recipients').then(function(response) {
      console.log('recipients response', response);
      data.recipients = response.data;
    })
  }

  //saves the request to database on initial button click
  var saveRequest = function(){
    console.log('we are sending teh data ', data.events);
    request = {
        recipients: [{
            // orgName: orgName,
            // username: username
        }],
        events: data.events
    }
    $http.post('/createRequest', data.events).then(function(response){
      console.log('response from da server is....... ', response);
    })
  }
  var loadRequests = function() {
    console.log('loadRequests hit');
    $http.get('/createRequest/getRequests').then(function(response) {
      console.log(response.data);
      data.requests = response.data;
    });
  }

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
  }

}]);
