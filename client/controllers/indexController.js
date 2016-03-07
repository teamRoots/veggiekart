app.controller('indexController', ['$scope', 'loginService', '$location', function($scope, loginService, $location){
  $scope.userLoggedIn = loginService.userLoggedIn;
  $scope.user = loginService.currentUser;
  $scope.logout = loginService.logout;
  $scope.logoClick = function(){
    if($scope.user.admin === true){
      $location.path('/admin/dashboard');
    }
  };
}]);
