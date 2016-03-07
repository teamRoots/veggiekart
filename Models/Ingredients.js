var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var IngredientSchema = new Schema({
  ingredients: [
  ]
});

module.exports = mongoose.model('Ingredient', IngredientSchema);
