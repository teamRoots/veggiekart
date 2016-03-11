//calculates vegetables
var summary = [];

vCalc = function(salads){
  // var summary = [];=================================POSSIBLE CHANGE

  //traverse down to the ingredient array, and if ingredient is new add to the summary array
    for (var j = 0; j < salads.length; j++){
      var saladQuantity = salads[j].quantity;
      var salad = salads[j].salad;

      for (var k = 0; k < salad.ingredients.length; k++){
        ingredient = salad.ingredients[k];

        //multiply the number of ingredients by the number of salads
        // ingredient.amount *= saladQuantity;
        //temp multiply function to account for the 48 salads in recipe issue
        ingredient.amount = ingredient.amount * saladQuantity / salad.totalSalads;

        //if the number of ounces is large, convert to pounds
        if (ingredient.unit == 'oz.' && ingredient.amount > 100) {
          ingredient.amount /= 16;
          ingredient.unit = 'lbs.';
        }

        //add ingredients to the summary array
        // ingredient.amount = ingredient.amount.toFixed(2);

        addToSummary(ingredient);
      }
    }

  return summary;

  function addToSummary(ingredient){

    //first check if summary array already has ingredients
    if (summary.length > 1) {

      //if so, then check if ingredient is already in the summary array
      for (var i = 0; i < summary.length; i++){
        if (summary[i].ingredient_name == ingredient.ingredient_name){

          //if ingredient is already in the summary, add the new amount (doing unit conversion if necessary)
          if (summary[i].unit == ingredient.unit){
            summary[i].amount += ingredient.amount;
          } else if (summary[i].unit == 'oz.' && ingredient.unit == 'lbs.'){
            summary[i].amount  += (ingredient.amount  / 16);
          } else if (summary[i].unit == 'lbs.' && ingredient.unit == 'oz.'){
            summary[i].amount  += (ingredient.amount  * 16);
          }
          return;
        }
      }
      // ingredient.amount = ingredient.amount.toFixed(2);
      summary.push(ingredient);
    } else {
      // ingredient.amount = ingredient.amount.toFixed(2);
      summary.push(ingredient);
    }
  }
};
