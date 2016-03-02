app.controller('loginController', ['loginService', 'createRequestService', function(loginService, createRequestService, $routeParams){
  this.user = loginService.user;
  this.login = loginService.login;
  // createRequestService.loadRequests();
}]);
