var app = angular.module('veggieKart', ['ngRoute']);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
  $routeProvider
    .when('/', {
      templateUrl: 'views/login.html',
      controller: 'loginController',
      controllerAs: 'login'
    })
    .when('/admin', {
      templateUrl: 'views/dashboard.html',
      controller: 'dashboardController',
      controllerAs: 'dash'
    })
    .when('/response', {
      templateUrl: 'views/farmResponse.html',
      controller: 'responseController',
      controllerAs: 'response'
    })
    .when('/admin/salad', {
      templateUrl: 'views/salad.html',
      controller: 'saladController',
      controllerAs: 'salad'
    })
    .when('/admin/reports', {
      templateUrl: 'views/reports.html',
      controller: 'reportsController',
      controllerAs: 'reports'
    })
    .when('/admin/request', {
      templateUrl: 'views/requestConfirmation.html',
      controller: 'newRequestController',
      controllerAs: 'request'
    });

  $locationProvider.html5Mode(true);
}]);

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
