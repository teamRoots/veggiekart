app.controller('dashboardController', ['loginService', 'eventsService', function(loginService, eventsService){
  this.user = loginService.user;
  // this.events = eventsService.events;
  // eventsService.getEvent();
}]);
