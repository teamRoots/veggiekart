app.controller('newRequestController', ['createRequestService', 'eventsService', 'saladService', function(createRequestService, eventsService, saladService){

  this.data = createRequestService.data;
  this.eventsData = eventsService.data;
  this.saladsData = saladService.data;

  this.newEvent = createRequestService.newEvent;
  this.oldData = createRequestService.oldData;
  this.cancelEvent = createRequestService.cancelEvent;
  this.addSalad = createRequestService.addSalad;
  this.recipients = createRequestService.getRecipients;
  this.saveRequest = createRequestService.saveRequest;
  this.sendRequest = createRequestService.sendRequest;
  this.newEditRequest = createRequestService.newEditRequest;
  this.editValue = createRequestService.editValue;

  this.addEvent = function(){
    createRequestService.addEvent();
    saladService.getSalads();
    this.saladsData = saladService.data;
    console.log('function hit', this.saladsData);

  };

  eventsService.getEvents();
  saladService.getSalads();
  createRequestService.getRecipients();

}]);
