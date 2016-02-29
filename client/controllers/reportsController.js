app.controller('reportsController', ['createRequestService', 'eventsService', 'saladService', 'loginService', function(createRequestService, eventsService, saladService, loginService){
  this.user = loginService.user;
  this.requests = createRequestService.data.requests;
 console.log('alsjdflk;asjdf;lksadlfl;;lsdf', this.requests);












}]);
