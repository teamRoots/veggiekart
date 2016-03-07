var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ResponseSchema = new Schema({
  requestId: Number,
  recipients: [{
    response_text: String,
    confirmation_text: String,
    name: String,
    email: String,   // is username possibly
    ingredients: [{
      name: String,
      quantity: Number,
      unit: String,
      confirmed_quantity: Number
    }]
  }]
});

module.exports = mongoose.model('Response', ResponseSchema);
