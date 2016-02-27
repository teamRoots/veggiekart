app.controller('confirmationController', ['responseService', function(responseService) {

  this.data = responseService.data;



  responseService.loadRequest();

}]);
