//Service to handle logins
app.factory('loginService', ['$http', '$location', function($http, $location){
  var user = {};
  var userRespondId;
  var userLoggedIn = {loggedIn: false};
  var currentUser = {
    data: ''
  };
  var loginInput = function(){
    if (e.keyCode == 13){
        login();
    }
  };
  //sends login request to server
  var login = function(){

    // For easy use uncomment
    // ++++++++++++++++++++++++++++++++++++++++++
    // ==========================================
      userLoggedIn.loggedIn = true;
      $location.path('/admin/dashboard');
    // ==========================================
    // ++++++++++++++++++++++++++++++++++++++++++

    $http.post('/authenticate/login', this.user).then(function(response){
      user = response.data.user;
      if (response.data.id) {
        userRespondId = response.data.id;
      }

      currentUser.data = response.data.user.firstName;
      //redirects to admin page if user is admin
      if(user.isAdmin == true){
        userLoggedIn.loggedIn = true;
        console.log('user is an admin!');
        $location.path('/admin/dashboard');

      //redirects to user page if user is not admin
      } else if (user.isAdmin == false) {
        userLoggedIn.loggedIn = true;
        console.log('user is NOT an admin!');
        $location.path('/user');

      //displays failure message if login failed
      }
      // comment out temporarily for testing purposes
      // else
      //  {
      //   console.log('login failed', response.data);
      //   $location.path('/');
      //   alert('Login failed. Please try again.');
      // }
    });
  };


  return {
    login: login,
    userLoggedIn: userLoggedIn,
    userRespondId: userRespondId,
    currentUser: currentUser,
    user: user
  }

}]);
