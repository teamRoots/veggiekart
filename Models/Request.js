var mongoose = require('mongoose');
var SaladSchema = require('./salads').schema;
var Schema = mongoose.Schema;

var RequestSchema = new Schema({
    event: [{
        name: String,
        date: Date,
        all_salads: [{
            total_salads: Number,
            salad: SaladSchema
        }]
    }],
    status: boolean,
    recipients: [{
        name: String,
        email: String   // need to get email for this
    }]
});

module.exports = mongoose.model('Request', RequestSchema);