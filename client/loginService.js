//Service to handle logins
app.factory('loginService', ['$http', function($http){
  var data = {};

  //sends login request to server
  var login = function(){

  }

  return {
    login: login,
    data: data
  }

}]);
