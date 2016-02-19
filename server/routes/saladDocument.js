//===================================
//All requirements

var express = require('express');
var router = express.Router();

//===================================
//All Models for data access

var Salad = require('../../Models/Salad');

//===================================
//Model in database creation

router.post('/createSalad', function(request, response) {
    var ingredients = [];
    for(i = 0; i < request.body.ingredients.length; i++){
    var ingredient = ({
        ingredient_name: request.body.ingredients[i].ingredient_name,
        amount: request.body.ingredients[i].amount,
        unit: request.body.ingredients[i].unit
    })
    ingredients.push(ingredient);
}

var newsalad = new Salad ({
    name: request.body.name,
    ingredients: ingredients,
})

newsalad.save(function(err){
    if(err){
        console.log(err);
    }
    response.sendStatus(200);
})
});


//===================================
//exporting the router

module.exports = router;
