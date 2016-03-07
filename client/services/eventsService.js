//Service to grab events from database and hold available for view
app.factory('eventsService', ['$http', '$filter', function($http, $filter){
  var data = {};
  var requests = [];
  var currentEvent = {};

  var getEvents = function(){
    requests = [];

    //get the events from the database
    $http.get('/events').then(function(response){
      data.events = response.data;

      for (var i = 0; i < data.events.length; i++) {
        currentEvent.location = data.events[i].venueName;

        for (var j = 0; j < data.events[i].events.length; j++) {
          currentEvent.date = data.events[i].events[j].eventDate;
          currentEvent.displayDate = $filter('date')(currentEvent.date, 'MMM d, yyyy');
          currentEvent.host = data.events[i].events[j].orgName;
          requests.push(currentEvent);
          currentEvent = {};
          currentEvent.location = data.events[i].venueName;
        }
      }
      data.events = requests;
    });
  };
  return {
    getEvents: getEvents,
    data: data
  };
}]);
