app.controller('dashboardController', ['loginService', 'eventsService', 'createRequestService', 'responseService', function(loginService, eventsService, createRequestService, responseService){
  this.user = loginService.user;
  this.data = eventsService.data;
  this.requestDetails = responseService.loadRequest;
  this.editRequest = createRequestService.editRequest;
  this.requests = createRequestService.data.requests;
  this.requestFalseUpdate = createRequestService.requestFalseUpdate;
  // createRequestService.requestFalseUpdate;

  eventsService.getEvents();
  createRequestService.loadRequests();
}]);
