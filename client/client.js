var app = angular.module('veggieKart', ['ngRoute']);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
  $routeProvider
    .when('/', {
      templateUrl: 'views/login.html',
      controller: 'loginController',
      controllerAs: 'login'
    })
    .when('/admin/dashboard', {
      templateUrl: 'views/dashboard.html',
      controller: 'dashboardController',
      controllerAs: 'dash'
    })
    .when('/farm/response', {
      templateUrl: 'views/farmResponse.html',
      controller: 'responseController',
      controllerAs: 'farm'
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
    .when('/admin/confirm', {
      templateUrl: 'views/requestConfirmation.html',
      controller: 'confirmationController',
      controllerAs: 'confirm'
    })
    .when('/admin/request', {
      templateUrl: 'views/request.html',
      controller: 'newRequestController',
      controllerAs: 'request'
    });

  $locationProvider.html5Mode(true);
}]);
