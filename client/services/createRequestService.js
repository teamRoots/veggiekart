//Service for admin to create new requests
app.factory('createRequestService', ['$http', function($http){
  var data = {
    events: []
  };
  var newEvent = {};
  var counter = 0;

  //adds event to the current request
  var addEvent = function(){
    data.events.push({event: newEvent.event, salad: newEvent.salad, saladQuantity: newEvent.saladQuantity, id: counter});
    console.log('newEvent is ', newEvent);
    console.log('data.events is ', data.events);
    counter++;
  }

  //adds salad to the current event
  var addSalad = function(event){

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
