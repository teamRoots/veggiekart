app.controller('indexController', ['$scope', 'loginService', function($scope, loginService){
  $scope.userLoggedIn = loginService.userLoggedIn;
}]);
