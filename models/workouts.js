var mongoose = require('mongoose'),
	  Schema = mongoose.Schema;

var workoutSchema = new Schema({
	name: 		{ type: String },
	excersices: [],
	lastDone: {
		type: Number
	}
});

module.exports = mongoose.model('workouts', workoutSchema);
