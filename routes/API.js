//File: routes/tvshows.js
module.exports = function(app) {

  var workoutSchema = require('../models/workouts.js');
  var excersiceSchema = require('../models/excersices.js');

  //GET - Return all tvshows in the DB
  findAllWorkouts = function(req, res) {
  	workoutSchema.find(function(err, workouts) {
  		if(!err) {
        console.log('GET /workouts')
  			res.send(workouts);
  		} else {
  			console.log('ERROR: ' + err);
  		}
  	});
  };

  //GET - Return a TVShow with specified ID
  findWorkoutById = function(req, res) {
  	workoutSchema.findById(req.params.id, function(err, workout) {
  		if(!err) {
        console.log('GET /workout/' + req.params.id);
  			res.send(workout);
  		} else {
  			console.log('ERROR: ' + err);
  		}
  	});
  };

  //POST - Insert a new TVShow in the DB
  addWorkout = function(req, res) {
    console.log("Workout adding requested: ", req.body);

    var workout = new workoutSchema({
    	name: 		req.body.name,
    	excersices: 		req.body.excersices,
      lastDone: Date.now()
    });

  	workout.save(function(err) {
  		if(!err) {
  			console.log('Workout created');
  		} else {
  			console.log('ERROR: ' + err);
  		}
  	});

  	res.send(workout);
  };

  //PUT - Update a register already exists
  updateWorkout = function(req, res) {
  	workoutSchema.findById(req.params.id, function(err, workout) {
  		workout.name   = req.body.name;
  		workout.excersices    = req.body.excersices;
      workout.lastDone = req.body.lastDone;

  		workout.save(function(err) {
  			if(!err) {
  				console.log('Workout updated');
  			} else {
  				console.log('ERROR: ' + err);
  			}
  			res.send(workout);
  		});
  	});
  }

  //DELETE - Delete a TVShow with specified ID
  deleteWorkout = function(req, res) {
  	workoutSchema.findById(req.params.id, function(err, workout) {
  		workout.remove(function(err) {
  			if(!err) {
  				console.log('Workout removed');
  			} else {
  				console.log('ERROR: ' + err);
  			}
        res.send({msg: "deleted"});
  		})
  	});
  }

  findAllExcersices = function(req, res) {
  	excersiceSchema.find(function(err, excersices) {
  		if(!err) {
        console.log('GET /excersices')
  			res.send(excersices);
  		} else {
  			console.log('ERROR: ' + err);
  		}
  	});
  };

  findExcersiceById = function(req, res) {
  	excersiceSchema.findById(req.params.id, function(err, excersice) {
  		if(!err) {
        console.log('GET /excersice/' + req.params.id);
  			res.send(excersice);
  		} else {
  			console.log('ERROR: ' + err);
  		}
  	});
  };

  addExcersice = function(req, res) {
    console.log("Excersice adding requested: ", req.body);

    var excersice = new excersiceSchema({
    	name : req.body.name,
    	restingTime : req.body.restingTime,
    	lastWeightUsed : req.body.lastWeightUsed,
      difficulty : req.body.difficulty,
    	sets : req.body.sets,
    	reps : req.body.reps,
    });

  	excersice.save(function(err) {
  		if(!err) {
  			console.log('Excersice created');
  		} else {
  			console.log('ERROR: ' + err);
  		}
  	});

  	res.send(excersice);
  };

  updateExcersice = function(req, res) {
  	excersiceSchema.findById(req.params.id, function(err, excersice) {
  		excersice.name   = req.body.name;
      excersice.restingTime    = req.body.restingTime;
      excersice.lastWeightUsed    = req.body.lastWeightUsed;
      excersice.difficulty    = req.body.difficulty;
      excersice.sets    = req.body.sets;
  		excersice.reps    = req.body.reps;

  		excersice.save(function(err) {
  			if(!err) {
  				console.log('Excersice updated');
  			} else {
  				console.log('ERROR: ' + err);
  			}
  			res.send(excersice);
  		});
  	});
  }

  deleteExcersice = function(req, res) {
  	excersiceSchema.findById(req.params.id, function(err, excersice) {
  		excersice.remove(function(err) {
  			if(!err) {
  				console.log('Excersice removed');
  			} else {
  				console.log('ERROR: ' + err);
  			}
        res.send({msg: "deleted"});
  		})
  	});
  }

  // WORKOUTS
  app.get('/workouts', findAllWorkouts);
  app.get('/workout/:id', findWorkoutById);
  app.post('/workouts', addWorkout);
  app.put('/workout/:id', updateWorkout);
  app.delete('/workout/:id', deleteWorkout);

  // EXCERSICES
  app.get('/excersices', findAllExcersices);
  app.get('/excersice/:id', findExcersiceById);
  app.post('/excersices', addExcersice);
  app.put('/excersice/:id', updateExcersice);
  app.delete('/excersice/:id', deleteExcersice);

}
