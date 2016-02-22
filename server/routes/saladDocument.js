//===================================
//All requirements

var express = require('express');
var router = express.Router();

//===================================
//All Models for data access
var Ingredient = require('../../Models/Ingredients')
var Salad = require('../../Models/Salad');

//===================================
//Model in database creation
router.post('/createSalad', function(request, response) {
    var ingredients = [];
    for(i = 0; i < request.body.ingredientArray.length; i++){
    var ingredient = {
        ingredient_name: request.body.ingredientArray[i].name,
        amount: request.body.ingredientArray[i].quantity,
        unit: request.body.ingredientArray[i].unit
    };
    ingredients.push(ingredient);
}
var newsalad = new Salad ({
    name: request.body.saladName,
    ingredients: ingredients,
})
console.log('newsalad', newsalad);
    //
    // Ingredient.findOne({}, function(err, ingredientPush){
    //         if (err){
    //             console.log(err);
    //         }
    //      else{
    //         console.log('createSalad ingredient')
    //         response.sendStatus(200);
    //     }
    // });
// });












newsalad.save(function(err){
    if(err){
        console.log(err);
    }
    response.send(200);
})
});

//===================================
//Post routes for controller responses

router.post('/fillSalad', function(request, response){
    Salad.find({}, function(err, salads){
        if (err){
            console.log(err);
        }
        Ingredient.find({}, function(err, ingredients){
            if (err){
                console.log(err);
            }
         else{
            var data = {
                salads: salads,
                ingredient: ingredients
            };
            response.send('++++salads woo hoo', data);
        }
    });
    });
});

router.post('/editSalad', function(request, response){
    Salad.find({_id: request.body._id}, function(err, salad){
        if (err){
            console.log(err);
        }
    //This will be a update into the database with the new values.
    });
});



//===================================
//exporting the router

module.exports = router;
