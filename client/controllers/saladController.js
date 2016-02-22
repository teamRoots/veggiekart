app.controller('saladController', ['loginService', '$scope', '$http', function(loginService, $scope, $http){
  this.user = loginService.user;
  $scope.listNewIngredients = [];
  $scope.listNewIngredientsDatabase = [];
  // $scope.newSalad.ingredients = [];


$scope.showSalads = function(){
  $http.post('/salad/fillSalad').then(function(response){
    $scope.salads = response.data.salads;
    $scope.ingredientsDatabase = response.data.ingredient[0].ingredients;
    console.log('response.data', response.data);


  });
};

$scope.editSalad = function(){
  $http.post('/salad/editSalad', editData).then(function(response){
    console.log('editSalad', response);
  });
};

$scope.createNewSalad = function(data){
  var dataObject = {
    saladName: data,
    ingredientArray: $scope.listNewIngredients,
    ingredientToPush: $scope.listNewIngredientsDatabase
  };
  $http.post('/salad/createSalad', dataObject).then(function(response){
    $scope.newSalad = {};
    $scope.listNewIngredients = [];
    $scope.listNewIngredientsDatabase = [];
    console.log('createSalad response', response.data);
    $scope.showSalads();



  });
};

$scope.createIngredient = function(data){
  $scope.listNewIngredients.push(data);
  $scope.listNewIngredientsDatabase.push(data.name);
  console.log('data', $scope.listNewIngredientsDatabase);
  $scope.newIngredient = {};
};

//===================================
//initializes the fillSalad function to populate page with salads

$scope.showSalads();

}]);
