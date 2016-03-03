app.controller('dashboardController', ['loginService', 'eventsService', 'createRequestService', 'responseService', '$location', function(loginService, eventsService, createRequestService, responseService, $location){
  this.user = loginService.user;
  this.data = eventsService.data;
  // this.editRequest = createRequestService.editRequest;
  this.requestsObj = createRequestService.data;
  this.requestFalseUpdate = createRequestService.requestFalseUpdate;

  this.requestDetails = function(id) {
    responseService.loadRequest(id);
    createRequestService.data.holdId = id;
    $location.path('/admin/confirm')
  }

  eventsService.getEvents();
  createRequestService.loadRequests();
}]);
