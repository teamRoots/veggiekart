app.controller('responseController', ['loginService', 'responseService', function(loginService, responseService){
  this.user = loginService.user;
  this.data = responseService.data;

  this.users = [{name: 'Scott'}, {name: 'Zach'},{name: 'Eric'},{name: 'Anthony'}];
  this.veggies = [{name: 'Parsnip', quantity: 2, unit: 'lbs.'},       {name: 'Spinach', quantity: 2, unit: 'lbs.'}, {name: 'Rutabega', quantity: 2, unit: 'lbs.'}, {name: 'Broccoli', quantity: 2, unit: 'lbs.'}];

}]);
