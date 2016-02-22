<<<<<<< HEAD
app.controller('dashboardController', ['loginService', 'eventsService', function(loginService, eventsService){
  this.user = loginService.user;
  this.data = eventsService.data;
  eventsService.getEvent();
=======
app.controller('dashboardController', ['loginService', 'eventsService', '$scope', '$http', function(loginService, eventsService, $scope, $http){
  eventsService.getEvents();

  $scope.events = eventsService.data.events;
  console.log('events in controller', $scope.events)
  // this.user = loginService.user;
  // this.events = eventsService.events;
>>>>>>> 73e18cc616ceb2e7891628236679576c039e43db
}]);
