var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// schema for the venue and events
var VenueSchema = new Schema({
  venueName: String,
  location: String,
  events: [{
    event: {
      eventDate: Date,
      organization: [{
        orgName: String,
        preference: {type: String, default: 'nores'}
      }],
      arrivalTime: Date,
      gameTime: Date,
      submitBy: Date
    }
  }]
});

module.exports = mongoose.model("Venue", VenueSchema);
