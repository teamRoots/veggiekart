app.controller('responseController', ['loginService', 'responseService', function(loginService, responseService){
  this.user = loginService.user;
  this.data = responseService.data;
  this.userLoggedIn = loginService.userLoggedIn;

  var id = loginService.userLoggedIn.respondId;

  responseService.loadRequest(id);

  this.test = function() {
    // console.log('user.commitment:', this.data.request);
  };

  this.sendResponse = responseService.sendResponse;
  this.validateResponse = responseService.validateResponse;

}]);
