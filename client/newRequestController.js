app.controller('newRequestController', ['createRequestService', function(createRequestService){
  this.data = createRequestService.data;

  //makes the service functions available on scope
  this.addEvent = createRequestService.addEvent;
  this.addSalad = createRequestService.addSalad;
  this.getRecipients = createRequestService.getRecipients;
  this.postRecipients = createRequestService.postRecipients;
  this.requestComments = createRequestService.requestComments;
  this.saveRequest = createRequestService.saveRequest;
  this.sendRequest = createRequestService.sendRequest;

}]);
