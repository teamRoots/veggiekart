app.controller('dashboardController', ['loginService', function(loginService){
  this.user = loginService.user;
}]);
