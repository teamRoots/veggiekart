//Service for admin to create new requests
app.factory('createRequestService', ['$http', '$location', function($http, $location){

  var idHolder = '';
  var editValue = {
    editPage: '',
    requestButtons: '',
    word: '',
    if: false
  };
  var oldData = {
    event: [],
    recipients:[],
    summary: []
  };
  var data = {
    events: [],
    salads: [],
    requests: [],
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

    //confirm there is an event and a salad, if none then display error
    if (!newEvent.event || newEvent.event.length < 1){
      console.log('event error folks');
      data.eventError = true;
      data.eventErrorMessage = 'Please select an event date from the dropdown.';
      return;
    }

    if (!newEvent.event || newEvent.salads.length < 1){
      console.log('salad error folks');
      data.eventError = true;
      data.eventErrorMessage = 'Please select a salad from the dropdown.';
      return;
    }

    //set salad quantity to 48 if no other value was entered
    for (var i = 0; i < newEvent.salads.length; i++){
      if (!newEvent.salads[i].quantity) {
        newEvent.salads[i].quantity = newEvent.salads[i].salad.totalSalads;
      }
    }

    //calculates the summary object
    data.summary = vCalc(newEvent.salads);

    //adds event to the events array
    data.events.push({
      event: newEvent.event,
      date: newEvent.event.date,
      salads: newEvent.salads.splice(0),
      id: eventCounter
    });

    //increments event count for next id, resets saladCounter
    eventCounter++;
    // newEvent = [];//=================================POSSIBLE CHANGE
    // saladCounter = 1;
  };

  //adds salad to the current event
  var addSalad = function(){
    saladCounter++;
    data.saladCounterArray.push({id: saladCounter});
  };

  //gets the recipients from the server
  var getRecipients = function(){
    $http.get('/requestRecipients/recipients').then(function(response) {
      data.recipients = response.data;
    });
  };

  //sends the request out to receipients on confirmation dialog click
  var sendRequest = function(){
    data.confirmMessage = 'Are you sure? ';
    data.dataValidated = true;

    //checks if any events have been added
    if (!data.events || data.events.length === 0) {
      data.confirmMessage += 'You didn\'t add any events.';
      data.dataValidated = false;
    }

    //checks if any recipients were added
    var anyRecipients = false;

    for (var i = 0; i < data.recipients.length; i++) {
      if (data.recipients[i].checked === true) {
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
  };

  //saves the request to database on initial button click
  var saveRequest = function(){
    data.confirmMessage = '';
    data.confirmIcon = true;

    request = {
        recipients: data.recipients,
        events: data.events,
        message: data.message,
        summary: data.summary
    };
    $http.post('/createRequest', request).then(function(response){
      data.confirmIcon = false;
      data.confirmRequest = false;
      data.events = [];
      request = {};
      data.summary = [];
      summary = [];
      data.message = '';
      saladCounter = 1;

      loadRequests();
    });
  };

  var loadRequests = function() {
    $http.get('/createRequest/getRequests').then(function(response) {
      data.requests = response.data;
      $location.path('admin/dashboard');
    });
  };

  var requestDetails = function(id) {
  };

  var editRequest = function() {
    showPreviousRequest();
    editValue.editPage = false;
    editValue.requestButtons = true;
    editValue.word = 'Edit New';
    idHolder = data.holdId;
    editValue.if = true;
  };

  var requestFalseUpdate = function(){
    editValue.editPage = false;
    editValue.requestButtons = false;
    editValue.word = 'New';
    editValue.if = false;
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
      // data.salads = [];
      data.summary = [];
      data.message = '';
      $location.path('/admin/dashboard');
    });
  };

  var showPreviousRequest = function(){
    var holder = {
      idHolder: data.holdId
    };

    $http.post('/createRequest/findOldRequest', holder).then(function(response){
      oldData.event = response.data.event;
      oldData.recipients = response.data.recipients;
      oldData.summary = response.data.summary;
    });
  };

  var cancelEvent = function(){
    data.events = [];
    request = {};
    data.summary = [];
    data.message = '';
    summary = [];
  };

  var updateConfirmation = function(data){
    $http.post('/createRequest/updateConfirmation', data).then(function(response){
      $location.path('admin/dashboard');
    });
  };

  return {
    addEvent: addEvent,
    updateConfirmation: updateConfirmation,
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
