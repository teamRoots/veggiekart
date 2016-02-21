//Service to grab events from database and hold available for view
app.factory('eventsService', ['$http', function($http){
  console.log('events service hit from dashboard');
  var data = {};

  var getEvents = function(){
    console.log('get yo events ya\'ll!');

    //placeholder event object for testing
    data.events = [
      {name: 'Tuesday game', date: '2/5/16', host: 'Youth Farms'},
      {name: 'Wednesday game' , date: '2/6/16', host: 'Youth Farms'},
      {name: 'Thursday game', date: '2/7/16', host: 'Youth Farms'}
    ];
    // console.log(data.events);

    //get the events from the database
    // $http.get('/events').then(function(response){
    //   console.log('event response.data is ', response.data);
      // data.events = response.data;
      // return data.events;

      // console.log(data.events);
    // })
  }

  return {
    getEvents: getEvents,
    data: data
  }

}]);
