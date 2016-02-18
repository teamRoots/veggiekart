app.controller('reportsController', ['loginService', function(loginService){
  this.user = loginService.user;
}]);
