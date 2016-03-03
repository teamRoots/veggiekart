//Service to handle logins
app.factory('loginService', ['$http', '$location', 'createRequestService', function($http, $location, createRequestService){
  var user = {};
  var userLoggedIn = {
    loggedIn: false,
    respondId: ''
  };
  var currentUser = {
    data: '',
    admin: false
  };

  //sends login request to server
  var login = function(){

    // For easy use uncomment
    // ++++++++++++++++++++++++++++++++++++++++++
    // ==========================================
      // userLoggedIn.loggedIn = true;
      // $location.path('/admin/dashboard');
    // // ==========================================
    // ++++++++++++++++++++++++++++++++++++++++++

    $http.post('/authenticate/login', this.user).then(function(response){
      // console.log('userrrrrrr', response.data.user.isAdmin);
      console.log('response', response);
      user = response.data.user;
      if (response.data.id) {
        userLoggedIn.respondId = response.data.id;
      }
      if(response.data === false){
        console.log('login failed', response.data);
        $location.path('/');
        alert('Login failed. Please try again.');
      }
      //redirects to admin page if user is admin
      else if(user.isAdmin == true){
        userLoggedIn.loggedIn = true;
        console.log('user is an admin!');
        currentUser.admin = response.data.user.isAdmin;
        currentUser.data = response.data.user.firstName;

        $location.path('/admin/dashboard');

      //redirects to user page if user is not admin
      } else if (user.isAdmin == false) {
        userLoggedIn.loggedIn = true;
        console.log('user is NOT an admin!');
        currentUser.admin = response.data.user.isAdmin;
        currentUser.data = response.data.user.firstName;
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
    }).then(createRequestService.loadRequests());
  };


  return {
    login: login,
    userLoggedIn: userLoggedIn,
    currentUser: currentUser,
    user: user
  }

}]);
