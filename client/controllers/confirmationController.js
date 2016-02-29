app.controller('confirmationController', ['responseService', 'createRequestService', function(responseService, createRequestService) {

  this.data = responseService.data;

  this.test = function() {
    console.log('user.commitment:', this.data.request);
  }

  this.addMessage = function() {
    console.log('message:', this.data.request)
  }

  this.editRequest = createRequestService.editRequest;

  this.confirmRequest = responseService.confirmRequest;

  console.log('createRequestService says...', createRequestService.data.holdId);
  responseService.loadRequest();

}]);
