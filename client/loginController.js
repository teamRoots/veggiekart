app.controller('loginController', ['loginService', function(loginService){
  this.user = loginService.user;
  this.login = loginService.login;
}]);
