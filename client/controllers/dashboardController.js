app.controller('dashboardController', ['loginService', 'eventsService', function(loginService, eventsService){
  this.user = loginService.user;
  this.data = eventsService.data;
  eventsService.getEvent();
}]);
