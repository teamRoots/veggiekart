//Service for admin to create new requests
app.factory('createRequestService', ['$http', '$location', function($http, $location){
  var idHolder = '';
  var editValue = {
    editPage: '',
    requestButtons: '',
    word: ''
  };
  var oldData = {
    event: [],
    recipients:[],
    summary: []
  }
  var data = {
    events: [],
    salads: [],
    saladCounterArray: [{id: 0}],
    confirmRequest: false
  };
  var newEvent = {
    salads: []
  };
  var eventCounter = 0;
  var saladCounter = 0;
  var request = {};

  //adds event to the current request
  var addEvent = function(){

    //set salad quantity to 48 if no other value was entered
    for (var i = 0; i < newEvent.salads.length; i++){
      console.log('salads ', newEvent.salads[i]);
      if (!newEvent.salads[i].quantity) {
        newEvent.salads[i].quantity = 48;
      }
    }

    //adds event to the events array
    data.events.push({
      event: newEvent.event,
      date: newEvent.event.date,
      salads: newEvent.salads.splice(0),
      id: eventCounter
    });

    //calculates the summary object
    data.summary = vCalc(data.events);

    //increments event count for next id, resets saladCounter
    eventCounter++;
    saladCounter = 1;
  };

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

  //sends the request out to receipients on confirmation dialog click
  var sendRequest = function(){
    data.confirmRequest = confirm('Are you sure?');
    if (data.confirmRequest) {
      saveRequest();
    }
  }

  //saves the request to database on initial button click
  var saveRequest = function(){

    request = {
        recipients: data.recipients,
        events: data.events,
        message: data.message,
        summary: data.summary
    }
    console.log('sending request to server ', request);
    $http.post('/createRequest', request).then(function(response){
      console.log('response from da server is....... ', response);
      data.events = [];
      request = {};
      data.salads = [];
      data.summary = [];
      data.message = '';
      $location.path('/admin/dashboard');


    })
  }

  var loadRequests = function() {
    $http.get('/createRequest/getRequests').then(function(response) {
      data.requests = response.data;
      console.log('data.requests is ', data.requests);
    });
  };

  var requestDetails = function(id) {
    console.log('request id:', id);
  };
  var editRequest = function() {
    console.log('holdId', data.holdId);
    editValue.editPage = true;
    editValue.requestButtons = true;
    editValue.word = 'Edit New';
    idHolder = data.holdId;
  };

  var requestFalseUpdate = function(){
    editValue.editPage = false;
    editValue.requestButtons = false;
    editValue.word = 'New';

  };

  var newEditRequest = function(){

        request = {
            recipients: data.recipients,
            events: data.events,
            message: data.message,
            summary: data.summary,
            idHolder: data.holdId
        };
        $http.post('/createRequest/editRequest', request).then(function(response){
          data.events = [];
          request = {};
          data.salads = [];
          data.summary = [];
          data.message = '';

          $location.path('/admin/dashboard');
        });

  };

  var showPreviousRequest = function(){
    var holder = {
      idHolder: data.holdId
    }
    $http.post('/createRequest/findOldRequest', holder).then(function(response){
      console.log(response);
      oldData.event = response.data.event;
      oldData.recipients = response.data.recipients;
      oldData.summary = response.data.summary;

    });
  };

  var cancelEvent = function(){
    data.events = [];
    request = {};
    data.salads = [];
    data.summary = [];
    data.message = '';

    $location.path('/admin/dashboard');
  };

    return {
    addEvent: addEvent,
    addSalad: addSalad,
    getRecipients: getRecipients,
    saveRequest: saveRequest,
    sendRequest: sendRequest,
    loadRequests: loadRequests,
    newEvent: newEvent,
    oldData: oldData,
    editRequest: editRequest,
    newEditRequest: newEditRequest,
    requestFalseUpdate: requestFalseUpdate,
    requestDetails: requestDetails,
    showPreviousRequest: showPreviousRequest,
    editValue: editValue,
    cancelEvent: cancelEvent,
    data: data
  };

}]);
