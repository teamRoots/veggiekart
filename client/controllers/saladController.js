app.controller('saladController', ['loginService','saladService', '$scope', '$http', function(loginService, saladService, $scope, $http){
  this.user = loginService.user;
  $scope.listNewIngredients = [];
  var saladPendingDelete = {};

  $scope.showSalads = function(){
    saladService.getSalads();
    $scope.salads = saladService;
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

    //check that necessary form inputs have been added
    if (typeof data === 'undefined' || data === '') {
      $scope.addSaladError = true;
      $scope.addSaladErrorMessage = 'Please add a salad name';
      return;
    }

    if ($scope.listNewIngredients.length < 1){
      $scope.addSaladError = true;
      $scope.addSaladErrorMessage = 'Please add ingredients to the salad';
      return;
    }

    //create object to send to server
    var dataObject = {
      saladName: data,
      ingredientArray: $scope.listNewIngredients
    };

    //send salad to server
    $http.post('/salad/createSalad', dataObject).then(function(response){
      $scope.newSalad = {};
      $scope.listNewIngredients = [];
      $scope.saladCreator = false;
      $scope.showSalads();
    });
  };

  $scope.removeSaladError = function(){
    $scope.addSaladError = false;
    $scope.addSaladErrorMessage = '';
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
      $scope.showDeleteModal = false;
      $scope.deleteMessage = '';
      $scope.confirmIcon = false;
      $scope.showSalads();
    });
  };

  $scope.pushIngredient = function(data){

    //check that necessary form inputs have been added
    if (typeof data === 'undefined'){
      $scope.addIngredientError = true;
      $scope.addIngredientErrorMessage = 'Please select an ingredient';
      return;
    }

    if (!data.name){
      $scope.addIngredientError = true;
      $scope.addIngredientErrorMessage = 'Please select an ingredient';
      return;
    }

    if (!data.quantity){
      $scope.addIngredientError = true;
      $scope.addIngredientErrorMessage = 'Please select a quantity';
      return;
    }

    if (!data.unit){
      $scope.addIngredientError = true;
      $scope.addIngredientErrorMessage = 'Please select a unit';
      return;
    }

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
