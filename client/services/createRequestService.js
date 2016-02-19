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

  //adds event to the current request
  var addEvent = function(){
    console.log(newEvent.salads);
    data.events.push({
      event: newEvent.event,
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
    console.log('saladCounter is ', saladCounter);
    console.log('data.saladCounterArray is ', data.saladCounterArray);
    // data.salads.push({name: newEvent.salad, quantity: newEvent.saladQuantity});
  }

  //gets the recipients from the server
  var getRecipients = function(){

  }

  //adds recipients to the request
  var postRecipients = function(){

  }

  //adds comments to the request
  var requestComments = function(){

  }

  //saves the request to database on initial button click
  var saveRequest = function(){

  }

  //sends the request out to receipients on confirmation dialog click
  var sendRequest = function(){

  }

  return {
    addEvent: addEvent,
    addSalad: addSalad,
    getRecipients: getRecipients,
    postRecipients: postRecipients,
    requestComments: requestComments,
    saveRequest: saveRequest,
    sendRequest: sendRequest,
    newEvent: newEvent,
    data: data
  }

}]);
