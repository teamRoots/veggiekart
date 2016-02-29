//Service to handle logins
app.factory('loginService', ['$http', '$location', function($http, $location){
  var user = {};
  var userRespondId;
  var userLoggedIn = {loggedIn: false};
  var currentUser = {
    data: '',
    admin: true //take this true out before deployment
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
      console.log('userrrrrrr', response.data.user.isAdmin);
      currentUser.admin = response.data.user.isAdmin;

      console.log('response.data.id is ', id);
      
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
        $location.path('/farm/response');

      //displays failure message if login failed
      }
      // comment out temporarily for testing purposes
      else
       {
        console.log('login failed', response.data);
        $location.path('/');
        alert('Login failed. Please try again.');
      }
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
