app.controller('dashboardController', ['loginService', 'eventsService', '$scope', '$http', function(loginService, eventsService, $scope, $http){
  console.log('dashboard controller hit');
  // this.user = loginService.user;
  // this.events = eventsService.events;
  eventsService.getEvent();
}]);
