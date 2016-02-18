var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SaladSchema = new Schema({
    name: String,
    ingredients: [{
        ingredient_name: String,
        amount: Number,
        unit: String
    }]
});

module.exports = mongoose.model('Salads', SaladSchema);
