var mongoose = require('mongoose');
var SaladSchema = require('./Salad').schema;
var Schema = mongoose.Schema;

var RequestSchema = new Schema({
    event: [{
        event: Object,
        date: Date,
        salads: [{
            quantity: Number,
            salad: SaladSchema
        }]
    }],
    status: String,
    recipients: [{
        name: String,
        email: String,   // is username possibly
        orgName: String,
        commitments: Object
    }],
    message: String,
    summary: Array
});

module.exports = mongoose.model('Request', RequestSchema);
