var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// for schedule print/view/save
// this model represents the saved schedule
var ScheduleSchema = new Schema({
  venueName: String,
  events: [{
    eventDate: Date,
    gameTime: String,
    arrivalTime: String,
    orgName: String
  }]
});

module.exports = mongoose.model("Schedule", ScheduleSchema);
