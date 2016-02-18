app.controller('saladController', ['loginService', function(loginService){
  this.user = loginService.user;
}]);
