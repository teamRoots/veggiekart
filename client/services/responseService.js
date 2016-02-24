app.factory('responseService', ['$http', function($http){
  var data = {};

  var loadRequest = function(id) {
    console.log('loadRequest hit', id);
    $http.get('/createRequest/getRequests/' + id).then(function(response) {
      data.request = response.data;
      console.log(response.data);
      var events = response.data.event;
      console.log('events:', events);
      data.eventsInfo = [];

      for (var i = 0; i < events.length; i++) {
        //cycle through events and pull out information2
        console.log('event', events[i].event);
        data.eventsInfo.push(events[i].event);
      }
      console.log('data.eventsInfo', data.eventsInfo);


    })
  };

  //sends the response to admin
  var sendResponse = function(){
    // $http.put('/')
  }
  return {
    loadRequest: loadRequest,
    sendResponse: sendResponse,
    data: data
  }

}]);
