app.controller('newRequestController', ['createRequestService', 'eventsService', 'saladService', function(createRequestService, eventsService, saladService){
  this.data = createRequestService.data;
  this.newEvent = createRequestService.newEvent;
  this.eventsData = eventsService.data;
  this.saladsData = saladService.data;
  this.oldData = createRequestService.oldData;
  eventsService.getEvents();
  saladService.getSalads();
  createRequestService.getRecipients();
  // createRequestService.showPreviousRequest(); // was for edit opened on edit button click
  this.cancelEvent = createRequestService.cancelEvent;
  //makes the service functions available on scope
  this.addEvent = createRequestService.addEvent;
  this.addSalad = createRequestService.addSalad;
  this.recipients = createRequestService.getRecipients;
  // this.getRecipients = createRequestService.getRecipients;
  // this.postRecipients = createRequestService.postRecipients;
  // this.requestComments = createRequestService.requestComments;
  this.saveRequest = createRequestService.saveRequest;
  this.sendRequest = createRequestService.sendRequest;
  this.newEditRequest = createRequestService.newEditRequest;
  this.editValue = createRequestService.editValue;


}]);
