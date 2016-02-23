//calculates vegetables
var vCalc = function(events){
  var summary = [];

  //traverse down to the ingredient array, and if ingredient is new add to the summary array
  for (var i = 0; i < events.length; i++){
    var salads = events[i].salads;

    for (var j = 0; j < salads.length; j++){
      var saladQuantity = events[i].salads[j].quantity;
      var salad = salads[j].salad;

      for (var k = 0; k < salad.ingredients.length; k++) {
        ingredient = salad.ingredients[k];

        //multiply the number of ingredients by the number of salads
        ingredient.amount *= saladQuantity;

        //if the number of ounces is large, convert to pounds
        if (ingredient.unit == 'ounces' && ingredient.amount > 100) {
          ingredient.amount /= 16;
          ingredient.unit = 'pounds';
        }

        //add ingredients to the summary array
        addToSummary(ingredient);
      }
    }
  }

  return summary;

  function addToSummary(ingredient){

    //first check if summary array already has ingredients
    if (summary.length > 1) {

      //if so, then check if ingredient is already in the summary array
      for (var i = 0; i < summary.length; i++){
        if (summary[i].ingredient_name == ingredient.ingredient_name) {
          
          //if ingredient is already in the summary, add the new amount (doing unit conversion if necessary)
          if (summary[i].unit == ingredient.unit){
            summary[i].amount += ingredient.amount;
          } else if (summary[i].unit == 'ounces' && ingredient.unit == 'pounds') {
            summary[i].unit += (ingredient.unit / 16);
          } else if (summary[i].unit == 'pounds' && ingredient.unit == 'ounces') {
            summary[i].unit += (ingredient.unit * 16);
          }
          return;
        }
      }
      summary.push(ingredient);
    } else {
      summary.push(ingredient);
    }
  };
};
