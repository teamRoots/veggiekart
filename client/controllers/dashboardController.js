app.controller('dashboardController', ['loginService', 'eventsService', 'createRequestService', 'responseService', function(loginService, eventsService, createRequestService, responseService){
  this.user = loginService.user;
  this.data = eventsService.data;
  eventsService.getEvents();
  createRequestService.loadRequests();
  this.requestDetails = responseService.loadRequest;

  // $scope.events = eventsService.data.events;
  // console.log('events in controller', $scope.events)
  this.requests = createRequestService.data.requests;
  // this.user = loginService.user;
  // this.events = eventsService.events;
}]);
