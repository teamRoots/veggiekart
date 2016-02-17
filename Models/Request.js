var mongoose = require('mongoose');
var SaladSchema = require('./salads').schema;
var Schema = mongoose.Schema;

var RequestSchema = new Schema({
    event: [{
        name: String,
        date: Date,
        all_salads: [{
            amount: Number,
            salad: SaladSchema
        }]
    }],
    status: boolean,
    recipients: [{
        name: String,
        email: String   // is username possibly
    }]
});

module.exports = mongoose.model('Request', RequestSchema);