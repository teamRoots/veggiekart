app.controller('dashboardController', ['loginService', 'eventsService', 'createRequestService', 'responseService', function(loginService, eventsService, createRequestService, responseService){
  this.user = loginService.user;
  this.data = eventsService.data;
  this.requestDetails = responseService.loadRequest;
  this.requests = createRequestService.data.requests;

  eventsService.getEvents();
  createRequestService.loadRequests();
}]);
