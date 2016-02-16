var app = angular.module('myApp', ['ngRoute']);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
    $routeProvider
        .when('/', {
            templateUrl: 'views/login.html',
            controller: 'loginController'
        })
        .when('/admin', {
            templateUrl: 'views/dashboard.html',
            controller: 'adminController'
        })
        .when('/user', {
            templateUrl: 'views/user.html',
            controller: 'userController'
        })
        .when('/salad', {
            templateUrl: 'views/salad.html',
            controller: 'saladController'
        })
        .when('/taskCreation', {
            templateUrl: 'views/taskCreation.html',
            controller: 'taskCreationController'
        })
        .when('/request', {
            templateUrl: 'views/request.html',
            controller: 'requestController'
        })
        .otherwise({
            redirectTo: '/'
        });

    $locationProvider.html5Mode(true);
}]);
