app.controller('confirmationController', ['responseService', 'createRequestService', function(responseService, createRequestService) {

  this.data = responseService.data;

  this.addMessage = responseService.addMessage;

  this.editRequest = createRequestService.editRequest;

  this.confirmRequest = responseService.confirmRequest;

  this.deleteRequest = responseService.deleteRequest;

  this.confirmDelete = responseService.confirmDelete;

  responseService.loadRequest();
  console.log('responseService', this.data);
}]);
