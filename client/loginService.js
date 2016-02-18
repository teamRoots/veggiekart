//Service to handle logins
app.factory('loginService', ['$http', '$location', function($http, $location){
  var data = {};

  //sends login request to server
  var login = function(){
    $http.post('/', this.user).then(function(response){
      console.log('login post response is ', response);

      if(response.data.isAdmin == true){
        console.log('user is an admin!');
        $location.path('/admin');
      } else if(response.data.isAdmin == false) {
        console.log('user is NOT an admin!');
        $location.path('/user');
      } else {
        console.log('login failed', response.data);
        alert('Login failed. Please try again.');
      }
    })
  }

  return {
    login: login,
    data: data
  }

}]);
