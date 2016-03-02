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

    if (!newEvent.event || newEvent.event.length < 1){
      console.log('event error folks');
      data.eventError = true;
      data.eventErrorMessage = 'Please select an event date from the dropdown.';
      return;
    };

    if (!newEvent.event || newEvent.salads.length < 1){
      console.log('salad error folks');
      data.eventError = true;
      data.eventErrorMessage = 'Please select a salad from the dropdown.';
      return;
    };

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
    console.log('data.summary after vCalc is ', data.summary);

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
    data.confirmMessage = 'Are you sure? ';
    data.dataValidated = true;

    console.log('data.events is ', data.events);
    console.log('data.recipients is ', data.recipients);

    //checks if any events have been added
    if (!data.events || data.events.length == 0) {
      data.confirmMessage += 'You didn\'t add any events.';
      data.dataValidated = false;
    }

    //checks if any recipients were added
    var anyRecipients = false;

    for (var i = 0; i < data.recipients.length; i++) {
      if (data.recipients[i].checked == true) {
        anyRecipients = true;
      }
    }

    if (!anyRecipients) {
      console.log('no recipients');
      data.confirmMessage += 'You didn\'t add any recipients.';
      data.dataValidated = false;
    }

    //displays dialog modal
    data.confirmRequest = true;
  }

  //saves the request to database on initial button click
  var saveRequest = function(){
    data.confirmMessage = '';
    data.confirmIcon = true;

    request = {
        recipients: data.recipients,
        events: data.events,
        message: data.message,
        summary: data.summary
    }
    console.log('sending request to server ', request);
    $http.post('/createRequest', request).then(function(response){
      data.confirmIcon = false;
      data.confirmRequest = false;
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
