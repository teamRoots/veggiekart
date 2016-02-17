var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ResponseSchema = new Schema({
    requestId: Number,
    recipients: [{
        name: String,
        email: String,   // is username possibly
        ingredients: [{
            name: String,
            quantity: Number,
            unit: String,
            confirmed_quantity: Number,
            response_text: String,
            confirmation_text: String
        }]
    }]

});

module.exports = mongoose.model('Response', ResponseSchema);