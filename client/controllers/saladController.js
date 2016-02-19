app.controller('saladController', ['loginService', '$scope', '$http', function(loginService, $scope, $http){
  this.user = loginService.user;
  $scope.listNewIngredients = [];
  // $scope.newSalad.ingredients = [];


$scope.showSalads = function(){
  $http.post('/fillSalad').then(function(response){
    $scope.salads = response.data;


  });
};

$scope.editSalad = function(){
  $http.post('/editSalad', editData).then(function(response){
    console.log('editSalad', response);
  });
};

$scope.createNewSalad = function(data){
  var dataObject = {
    saladName: data,
    ingredientArray: $scope.listNewIngredients
  }
  $http.post('/createSalad', dataObject).then(function(response){
    $scope.newSalad = {};
    $scope.listNewIngredients = [];
    console.log('createSalad response', response.data);
    $scope.showSalads();



  });
};

$scope.createIngredient = function(data){
  $scope.listNewIngredients.push(data);
  $scope.newIngredient = {};
};

//===================================
//initializes the fillSalad function to populate page with salads

$scope.showSalads();

}]);
