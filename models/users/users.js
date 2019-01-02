var mongoose = require('mongoose'),
	  Schema = mongoose.Schema;

var User = new Schema({
	username : String,
  password: String
});

// the app file connects to a mongo db using (mongodb:http://localhost:27017/workouts), so the connection to the db is handled in app.js
// Here, we set an interface validator (schema) and export it with mongoose.model. The first argument determines which collection it corresponds to, and the second one, our schema.
// This is the way we connect to a specific collection, then use the exported object's methods.
module.exports = mongoose.model('users', User);
