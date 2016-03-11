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
      user = response.data.user;

      if (response.data.id) {
        userLoggedIn.respondId = response.data.id;
      }

      if(response.data === false){
        $location.path('/');
        console.log('false');
        alert('Login failed. Please try again.');
      }

      //redirects to admin page if user is admin
      else if(user.isAdmin === true){
        userLoggedIn.loggedIn = true;
        currentUser.admin = response.data.user.isAdmin;
        currentUser.data = response.data.user.firstName;
        console.log('admin');

        $location.path('/admin/dashboard');

      //redirects to user page if user is not admin
    } else if (user.isAdmin === false){
        userLoggedIn.loggedIn = true;
        currentUser.admin = response.data.user.isAdmin;
        currentUser.data = response.data.user.firstName;
        $location.path('/farm/response');
        console.log('user');

      } else {
        $location.path('/');
        alert('Login failed. Please try again.');
      }
    })
    // .then(createRequestService.loadRequests());
  };

  var logout = function(){
    $http.get('/authenticate/logout').then(function(response){
      $location.path('/');
    });
  };

  return {
    login: login,
    logout: logout,
    userLoggedIn: userLoggedIn,
    currentUser: currentUser,
    user: user
  };
}]);
