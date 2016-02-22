var mongoose = require('mongoose');
var SaladSchema = require('./Salad').schema;
var Schema = mongoose.Schema;

var RequestSchema = new Schema({
    event: [{
        name: String,
        date: Date,
        salads: [{
            quantity: Number,
            salad: SaladSchema
        }]
    }],
    status: Boolean,
    recipients: [{
        name: String,
        email: String   // is username possibly
    }]
});

module.exports = mongoose.model('Request', RequestSchema);
