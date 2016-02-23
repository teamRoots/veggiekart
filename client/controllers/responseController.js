app.controller('responseController', ['loginService', 'responseService', function(loginService, responseService){
  this.user = loginService.user;
  this.data = responseService.data;
}]);
