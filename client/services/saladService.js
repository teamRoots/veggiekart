//Service for admin to create and delete salads
app.factory('saladService', ['$http', function($http){
  var salad = {};

  //adds salad recipe to the database
  var addSalad = function(){

  }

  //deletes salad recipe from the database
  var deleteSalad = function(){

  }

  //returns all salads
  var getSalads = function(){
    //response set to allSalads = {}
  }

  return {
    addSalad: addSalad,
    salad: salad
  }

}]);
