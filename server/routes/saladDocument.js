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
    var ingredient = [{
        ingredient_name: request.body.ingredients[i].ingredient_name,
        amount: request.body.ingredients[i].amount,
        unit: request.body.ingredients[i].unit
    }]
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
//Post routes for controller responses

router.post('/fillSalad', function(request, response){
    // Salad.find({}, function(err, salads){
    //     if (err){
    //         console.log(err);
    //     } else{
            response.send('++++salads woo hoo');
        // }
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
