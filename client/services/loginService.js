//Service to handle logins
app.factory('loginService', ['$http', '$location', 'createRequestService', function($http, $location, createRequestService){
  var loginReady = true;
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
    console.log('login clicked');

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
        console.log('response.data.Id', userLoggedIn.loggedIn);
      }

      if(response.data === false){
        console.log('login failed', response.data);
        console.log('failed', userLoggedIn.loggedIn);

        $location.path('/');
        alert('Login failed. Please try again.');
      }

      //redirects to admin page if user is admin
      else if(user.isAdmin == true){
        userLoggedIn.loggedIn = true;
        loginReady = false;
        console.log('isAdmin true', userLoggedIn.loggedIn);

        currentUser.admin = response.data.user.isAdmin;
        currentUser.data = response.data.user.firstName;

        // $location.path('/admin/dashboard');

      //redirects to user page if user is not admin
      } else if (user.isAdmin == false) {
        console.log('isAdmin false', userLoggedIn.loggedIn);

        userLoggedIn.loggedIn = true;
        currentUser.admin = response.data.user.isAdmin;
        currentUser.data = response.data.user.firstName;

        $location.path('/farm/response');
      } else {
        console.log('failed', userLoggedIn.loggedIn);
        $location.path('/');
        alert('Login failed. Please try again.');
      }
    }).then(createRequestService.loadRequests());
  };

  var logout = function(){
    $http.get('/authenticate/logout').then(function(response){
      $location.path('/');
    });
  }

  return {
    logout: logout,
    login: login,
    loginReady: loginReady,
    userLoggedIn: userLoggedIn,
    currentUser: currentUser,
    user: user
  }

}]);
