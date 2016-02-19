app.controller('saladController', ['loginService', '$scope', '$http', function(loginService, $scope, $http){
  this.user = loginService.user;



$scope.showSalads = function(){
  $http.post('/fillSalad', data).then(function(response){
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

//===================================
//initializes the fillSalad function to populate page with salads

showSalads();

}]);
