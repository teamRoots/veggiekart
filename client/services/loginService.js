//Service to handle logins
app.factory('loginService', ['$http', '$location', function($http, $location){
  var user = {};
  var userLoggedIn = {loggedIn: false};

  //sends login request to server
  var login = function(){
    console.log('user is ', user);

    //TEMPORARILY set userLoggedIn=true so front page of site works. remove after login system working
    userLoggedIn.loggedIn = true;
    $location.path('/admin/dashboard');
    //END TEMPORARY

    $http.post('/login', this.user).then(function(response){
      console.log('login post response is ', response);

      //redirects to admin page if user is admin
      if(response.data.isAdmin == true){
        console.log('user is an admin!');
        $location.path('/admin');

      //redirects to user page if user is not admin
      } else if(response.data.isAdmin == false) {
        console.log('user is NOT an admin!');
        $location.path('/user');

      //displays failure message if login failed
      } else {
        console.log('login failed', response.data);
        alert('Login failed. Please try again.');
      }
    })
  }

  return {
    login: login,
    userLoggedIn: userLoggedIn,
    user: user
  }

}]);
