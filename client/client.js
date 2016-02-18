var app = angular.module('veggieKart', ['ngRoute']);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
  $routeProvider
    .when('/', {
      templateUrl: 'views/login.html',
      controller: 'dashboard',
      controllerAs: 'dash'
    });

  $locationProvider.html5Mode(true);
}]);

app.controller('dashboard', function(){
  this.hello = 'hello world';
});

// var app = angular.module('myApp', ['ngRoute']);
//
// app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
//     $routeProvider
//         .when('/', {
//             templateUrl: 'views/login.html',
//             controller: 'loginController'
//         })
//         .when('/admin', {
//             templateUrl: 'views/dashboard.html',
//             controller: 'adminController'
//         })
//         .when('/user', {
//             templateUrl: 'views/user.html',
//             controller: 'userController'
//         })
//         .when('/salad', {
//             templateUrl: 'views/salad.html',
//             controller: 'saladController'
//         })
//         .when('/requestConfirmation', {
//             templateUrl: 'views/requestConfirmation.html',
//             controller: 'requestConfirmationController'
//         })
//         .when('/request', {
//             templateUrl: 'views/request.html',
//             controller: 'requestController'
//         })
//         .otherwise({
//             redirectTo: '/'
//         });
//
//     $locationProvider.html5Mode(true);
// }]);
