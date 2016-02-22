//Service to grab events from database and hold available for view
app.factory('eventsService', ['$http', function($http){
  console.log('events service hit from dashboard');
  var data = {};
  var requests = [];
  var currentEvent = {};

<<<<<<< HEAD
  var getEvent = function(){
    // console.log('get yo events ya\'ll!');
=======
  var getEvents = function(){
    console.log('get yo events ya\'ll!');

    //placeholder event object for testing
    data.events = [
      {name: 'Tuesday game', date: '2/5/16', host: 'Youth Farms'},
      {name: 'Wednesday game' , date: '2/6/16', host: 'Youth Farms'},
      {name: 'Thursday game', date: '2/7/16', host: 'Youth Farms'}
    ];
    // console.log(data.events);
>>>>>>> 73e18cc616ceb2e7891628236679576c039e43db

    //get the events from the database
    $http.get('/events').then(function(response){
      // console.log('event response.data is ', response.data);
      data.events = response.data;
<<<<<<< HEAD
      for (var i = 0; i < data.events.length; i++) {
        currentEvent.location = data.events[i].venueName;
        for (var j = 0; j < data.events[i].events.length; j++) {
          currentEvent.date = data.events[i].events[j].eventDate;
          currentEvent.host = data.events[i].events[j].orgName;
          // console.log('new currentEvent object: ', currentEvent);
          requests.push(currentEvent);
          // console.log('current requests array ', requests);
          currentEvent = {};
          currentEvent.location = data.events[i].venueName;
        }
      }


      // console.log('new requests array: ', requests);
      // console.log('data.events ', data.events);

      data.events = requests;

    });
  };
=======
      return data.events;

      console.log(data.events);
    })
  }
>>>>>>> 73e18cc616ceb2e7891628236679576c039e43db

  return {
    getEvents: getEvents,
    data: data
  };

}]);
