app.controller('dashboardController', ['loginService', 'eventsService', 'createRequestService', '$scope', '$http', function(loginService, eventsService, createRequestService, $scope, $http){
  eventsService.getEvents();
  createRequestService.loadRequests()

  $scope.events = eventsService.data.events;
  console.log('events in controller', $scope.events)
  this.requests = createRequestService.data.requests;
  console.log('this.requests', this.requests);
  // this.user = loginService.user;
  // this.events = eventsService.events;
}]);
