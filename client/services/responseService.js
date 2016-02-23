app.factory('responseService', ['$http', function($http){
  var data = {
    hello: 'hello world'
  };

  var loadRequest = function(id) {
    console.log('loadRequest hit', id);
    $http.get('/createRequest/getRequests/' + id).then(function(response) {
      console.log(response.data);
      data.requestToDisplay = response.data

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
