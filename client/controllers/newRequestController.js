app.controller('newRequestController', ['createRequestService', 'eventsService', 'saladService', function(createRequestService, eventsService, saladService){
  this.data = createRequestService.data;
  this.eventsData = eventsService.data;
  this.salads = saladService.salads;
  console.log('hi Im a request controller');
  eventsService.getEvent();

  //makes the service functions available on scope
  this.addEvent = createRequestService.addEvent;
  // this.addSalad = createRequestService.addSalad;
  // this.getRecipients = createRequestService.getRecipients;
  // this.postRecipients = createRequestService.postRecipients;
  // this.requestComments = createRequestService.requestComments;
  // this.saveRequest = createRequestService.saveRequest;
  // this.sendRequest = createRequestService.sendRequest;

}]);
