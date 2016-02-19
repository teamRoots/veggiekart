app.controller('saladController', ['loginService', '$scope', '$http', function(loginService, $scope, $http){
  this.user = loginService.user;
  $scope.listNewIngredients = [];
  // $scope.newSalad.ingredients = [];


$scope.showSalads = function(){
  $http.post('/fillSalad').then(function(response){
    console.log('Fill Salad', response);
  });
};

$scope.editSalad = function(){
  $http.post('/editSalad', editData).then(function(response){
    console.log('editSalad', response);
  });
};

$scope.createSalad = function(){
  $http.post('/createSalad', createData).then(function(response){
    console.log('createSalad', response);
  });
};

$scope.createIngredient = function(data){
  console.log('This is the data', data);
  // ingredientHolder.push(data);
  $scope.listNewIngredients.push(data);
  console.log('try this', $scope.listNewIngredients);
  $scope.newIngredient = {};
};

//===================================
//initializes the fillSalad function to populate page with salads

$scope.showSalads();

}]);
