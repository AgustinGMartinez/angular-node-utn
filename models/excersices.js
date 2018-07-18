var mongoose = require('mongoose'),
	  Schema = mongoose.Schema;

var excersiceSchema = new Schema({
	name : String,
	restingTime : Number,
	lastWeightUsed : Number,
  difficulty : String,
	sets : Number,
	reps : Number,
});

module.exports = mongoose.model('excersices', excersiceSchema);
