app.controller('responseController', ['loginService', 'responseService', function(loginService, responseService){
  this.user = loginService.user;
  this.data = responseService.data;
  // this.request = responseService.data.requestToDisplay;
  console.log('this.data:', this.data.event);

  // var id = 56cc86a8b44b04c36c98d530;

  // responseService.loadRequest(id);

  this.users = [{name: 'Scott'}, {name: 'Zach'},{name: 'Eric'},{name: 'Anthony'}];
  this.veggies = [{name: 'Parsnip', quantity: 2, unit: 'lbs.'},       {name: 'Spinach', quantity: 2, unit: 'lbs.'}, {name: 'Rutabega', quantity: 2, unit: 'lbs.'}, {name: 'Broccoli', quantity: 2, unit: 'lbs.'}];

  this.test = function() {
    console.log('user.commitment:', this.data.request);
  }

}]);
