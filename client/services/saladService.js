//Service for admin to create and delete salads
app.factory('saladService', ['$http', function($http){
  var data = {};

  //adds salad recipe to the database
  var addSalad = function(){

  }

  //deletes salad recipe from the database
  var deleteSalad = function(){

  }

  //returns all salads
  var getSalads = function(){
    data.salads = [
      {name: 'Crunch Bean Bowl salad'},
      {name: 'Grand Salami Salad'},
      {name: 'La Jefa Salad'}
    ];
    console.log(data.salads);
  }

  return {
    addSalad: addSalad,
    getSalads: getSalads,
    data: data
  }

}]);
