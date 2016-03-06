app.controller('loginController', ['loginService', 'createRequestService', function(loginService, createRequestService, $routeParams){
  this.userLoggedIn = loginService.loginReady;
  this.user = loginService.user;
  this.login = loginService.login;
  // createRequestService.loadRequests();
}]);
