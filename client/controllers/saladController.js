app.controller('saladController', ['loginService','saladService', '$scope', '$http', function(loginService, saladService, $scope, $http){
  this.user = loginService.user;
  $scope.listNewIngredients = [];
  $scope.listNewIngredientsDatabase = [];


$scope.showSalads = function(){
    saladService.getSalads();
    $scope.salads = saladService;
    $scope.ingredientsDatabase = saladService;
};

$scope.cancelCreation = function(){
  $scope.newSalad = {};
  $scope.listNewIngredients = [];
  $scope.listNewIngredientsDatabase = [];
}
$scope.editSalad = function(){
  $http.post('/salad/editSalad', editData).then(function(response){
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
    $scope.showSalads();
  });
};

$scope.createIngredient = function(data){
  $scope.listNewIngredients.push(data);
  $scope.listNewIngredientsDatabase.push(data.name);
  $scope.newIngredient = {};
};

$scope.deleteSalad = function(data){
  if (confirm('Are You Sure You Want To Delete This Salad') === true){
    $http.post('/salad/deleteSalad', data).then(function(response){
      $scope.showSalads();

  });
}
};


//===================================
//initializes the fillSalad function to populate page with salads

$scope.showSalads();

}]);
