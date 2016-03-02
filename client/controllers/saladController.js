app.controller('saladController', ['loginService','saladService', '$scope', '$http', function(loginService, saladService, $scope, $http){
  this.user = loginService.user;
  $scope.listNewIngredients = [];
  var saladPendingDelete = {};

$scope.showSalads = function(){
    saladService.getSalads();
    $scope.salads = saladService;
    console.log(saladService);
    $scope.ingredientsDatabase = saladService;
};

$scope.cancelCreation = function(){
  $scope.newSalad = {};
  $scope.newIngredient = {};
  $scope.createNewIngredient = {};
  $scope.listNewIngredients = [];
};
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

$scope.confirmDelete = function(salad){
  $scope.showDeleteModal = true;
  $scope.confirmIcon = false;
  $scope.deleteMessage = 'Are you sure?';
  saladPendingDelete = salad;
};

$scope.removeDeleteModal = function(){
  $scope.showDeleteModal = false;
  $scope.confirmIcon = false;
  $scope.deleteMessage = 'Are you sure?';
};

$scope.deleteSalad = function(){
    $scope.confirmIcon = true;
    $http.post('/salad/deleteSalad', saladPendingDelete).then(function(response){
      console.log('SALAD DELETED');
      $scope.showDeleteModal = false;
      $scope.deleteMessage = '';
      $scope.confirmIcon = false;
      $scope.showSalads();
    });
};

$scope.pushIngredient = function(data){

  //check that necessary form inputs have been added
  if (typeof data === 'undefined') {
    console.log('newIngredient undefined');
    $scope.addIngredientError = true;
    $scope.addIngredientErrorMessage = 'Please select an ingredient';
    return;
  }

  if (!data.name) {
    console.log('newIngredient name missing');
    $scope.addIngredientError = true;
    $scope.addIngredientErrorMessage = 'Please select an ingredient';
    return;
  };

  if (!data.quantity) {
    console.log('newIngredient quantity missing');
    $scope.addIngredientError = true;
    $scope.addIngredientErrorMessage = 'Please select a quantity';
    return;
  };

  if (!data.unit) {
    console.log('newIngredient unit missing');
    $scope.addIngredientError = true;
    $scope.addIngredientErrorMessage = 'Please select a unit';
    return;
  };

  //push data to incredients array
  $scope.listNewIngredients.push(data);
  $scope.newIngredient = {};
};

$scope.removeIngredientError = function(){
  $scope.addIngredientError = false;
  $scope.addIngredientErrorMessage = '';
  return;
};

//===================================
//initializes the fillSalad function to populate page with salads

$scope.showSalads();

}]);
