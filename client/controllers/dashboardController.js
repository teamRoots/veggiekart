app.controller('dashboardController', ['loginService', 'eventsService', '$scope', '$http', function(loginService, eventsService, $scope, $http){
  eventsService.getEvents();

  $scope.events = eventsService.data.events;
  console.log('events in controller', $scope.events)
  // this.user = loginService.user;
  // this.events = eventsService.events;
}]);
