app.factory('responseService', ['$http', function($http){
  var data = {};

  var loadRequest = function(id) {
    console.log('loadRequest hit', id);
    $http.get('/createRequest/getRequests/' + id).then(function(response) {
      data.request = response.data;
      var events = response.data.event;
      data.eventsInfo = [];

      for (var i = 0; i < events.length; i++) {
        data.eventsInfo.push(events[i].event);
      }
      console.log('data.eventsInfo', data.eventsInfo);


    })
  };

  //sends the response to admin
  var sendResponse = function(){
    console.log('response to send:', data.request._id);
    var id = data.request._id;
    $http.put('/createRequest/updateRequest/' + id, data.request).then(function(response) {
      console.log(response);
    })
  }

  var confirmRequest = function(){
    // console.log('response to send:', data.request._id);
    console.log('data.request:', data.request);
    var id = data.request._id;
    $http.put('/createRequest/confirmRequest/' + id, data.request).then(function(response) {
      console.log(response);
    })
  }
  return {
    loadRequest: loadRequest,
    sendResponse: sendResponse,
    confirmRequest: confirmRequest,
    data: data
  }

}]);
