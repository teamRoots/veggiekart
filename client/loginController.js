app.controller('loginController', ['loginService', function(loginService){
  this.data = loginService.data;
  this.login = loginService.login;
}]);
