app.controller('saladController', ['loginService','saladService', '$scope', '$http', function(loginService, saladService, $scope, $http){
  this.user = loginService.user;
  $scope.listNewIngredients = [];


$scope.showSalads = function(){
    saladService.getSalads();
    $scope.salads = saladService;
    console.log(saladService);
    $scope.ingredientsDatabase = saladService;
};

$scope.cancelCreation = function(){
  $scope.newSalad = {};
  $scope.listNewIngredients = [];
}
$scope.editSalad = function(){
  $http.post('/salad/editSalad', editData).then(function(response){
  });
};

$scope.createNewSalad = function(data){
  var dataObject = {
    saladName: data,
    ingredientArray: $scope.listNewIngredients
  };
  $http.post('/salad/createSalad', dataObject).then(function(response){
    $scope.newSalad = {};
    $scope.listNewIngredients = [];
    $scope.showSalads();
  });
};

$scope.createIngredient = function(data){
  $http.post('/salad/createIngredient', data).then(function(response){
  $scope.createNewIngredient = {};
  $scope.showSalads();
});
};

$scope.deleteSalad = function(data){
  if (confirm('Are You Sure You Want To Delete This Salad') === true){
    $http.post('/salad/deleteSalad', data).then(function(response){
      $scope.showSalads();

  });
}
};

$scope.pushIngredient = function(data){
  $scope.listNewIngredients.push(data);
  $scope.newIngredient = {};
};


//===================================
//initializes the fillSalad function to populate page with salads

$scope.showSalads();

}]);
