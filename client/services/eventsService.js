//Service to grab events from database and hold available for view
app.factory('eventsService', ['$http', function($http){
  var data = {};

  var getEvent = function(){
    console.log('get yo events ya\'ll!');

    //placeholder event object for testing
    data.events = [
      {name: 'Tuesday game'},
      {name: 'Wednesday game'},
      {name: 'Thursday game'}
    ];
    console.log(data.events);

    //get the events from the database
    $http.get('/events').then(function(response){
      console.log('event response.data is ', response.data);
      data.events = response.data;
    });
  };

  return {
    getEvent: getEvent,
    data: data
  };

}]);
