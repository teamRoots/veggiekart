app.controller('confirmationController', ['responseService', function(responseService) {

  this.data = responseService.data;

  this.test = function() {
    console.log('user.commitment:', this.data.request);
  }

  this.addMessage = function() {
    console.log('message:', this.data.request)
  }

  this.confirmRequest = responseService.confirmRequest;

  responseService.loadRequest();

}]);
