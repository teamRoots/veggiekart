app.factory('responseService', ['$http', function($http){
  var data = {
    hello: 'hello world'
  };

  var loadRequest = function() {
    console.log('loadRequest hit');
    $http.get('/loadRequest/:id').then(function(response) {
      console.log(response);
    })
  };

  //sends the response to admin
  var sendResponse = function(){

  }
  return {
    loadRequest: loadRequest,
    sendResponse: sendResponse,
    data: data
  }

}]);
