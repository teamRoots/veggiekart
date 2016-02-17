var app = angular.module('veggieKart', ['ngRoute']);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
  $routeProvider
    .when('/', {
      templateUrl: 'views/dashboard.html',
      controller: 'dashboard',
      controllerAs: 'dash'
    });

  $locationProvider.html5Mode(true);
}]);

app.controller('dashboard', function(){
  this.hello = 'hello world';
});
