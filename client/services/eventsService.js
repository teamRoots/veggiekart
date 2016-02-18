//Service to grab events from database and hold available for view
app.factory('eventsService', ['$http', function($http){
  var events = {};

  var getEvent = function(){
    console.log('get yo events ya\'ll!');
    $http.get('/events').then(function(response){
      console.log('event response.data is ', response.data);
      events = response.data;
    })
  }

  return {
    getEvent: getEvent,
    events: events
  }

}]);
