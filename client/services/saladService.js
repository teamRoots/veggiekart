//Service for admin to create and delete salads
app.factory('saladService', ['$http', function($http){
  var data = {};

  // these are unused??? addSalad and deleteSalad
  // adds salad recipe to the database
  var addSalad = function(){

  }

  //deletes salad recipe from the database
  var deleteSalad = function(){

  }

  //returns all salads
  var getSalads = function(){

    $http.post('/salad/fillSalad').then(function(response){
      data.salads = response.data.salads;
      console.log('service hit', data.salads);

      if (response.data.ingredient.length !== 0){
        data.ingredientsDatabase = response.data.ingredient[0].ingredients;
      } else {
        console.log('no ingredients');
      }
    });
  };

  return {
    addSalad: addSalad,
    getSalads: getSalads,
    data: data
  };
}]);
