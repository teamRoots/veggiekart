app.controller('dashboardController', ['loginService', 'eventsService', 'createRequestService', function(loginService, eventsService, createRequestService){
  this.user = loginService.user;
  this.data = eventsService.data;
  eventsService.getEvents();
  // createRequestService.loadRequests()

  // $scope.events = eventsService.data.events;
  // console.log('events in controller', $scope.events)
  this.requests = createRequestService.data.requests;
  console.log('this.requests', this.requests);
  // this.user = loginService.user;
  // this.events = eventsService.events;
}]);
