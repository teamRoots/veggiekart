app.controller('newRequestController', ['createRequestService', 'eventsService', 'saladService', function(createRequestService, eventsService, saladService){
  this.data = createRequestService.data;
  this.newEvent = createRequestService.newEvent;
  this.eventsData = eventsService.data;
  this.saladsData = saladService.data;
  console.log('hi Im a request controller');
  eventsService.getEvents();
  saladService.getSalads();
  createRequestService.getRecipients();

  //makes the service functions available on scope
  this.addEvent = createRequestService.addEvent;
  this.addSalad = createRequestService.addSalad;
  this.recipients = createRequestService.getRecipients;
  console.log(this.recipients);
  // this.getRecipients = createRequestService.getRecipients;
  // this.postRecipients = createRequestService.postRecipients;
  // this.requestComments = createRequestService.requestComments;
  this.saveRequest = createRequestService.saveRequest;
  // this.sendRequest = createRequestService.sendRequest;

}]);
