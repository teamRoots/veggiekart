app.controller('responseController', ['loginService', function(loginService){
  this.user = loginService.user;
}]);
