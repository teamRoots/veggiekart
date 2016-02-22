var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var IngredientSchema = new Schema({
    ingredients: [{
        ingredientName: String
    }]
});

module.exports = mongoose.model('Ingredient', IngredientSchema);
