module.exports = function(app, config) {
  var express = require('express');
  var jwt = require('jsonwebtoken');
  var bcrypt = require('bcryptjs');
  var User = require('../models/users/users');
  var router = express.Router();
  var verifyToken = require('./verifyToken');
  var createToken = require('./createToken');

  router.post('/register', function(req, res) {

    if (!req.body.username || !req.body.password) {
      res.status(400).send("Invalid request body");
    }

    User.findOne({username: req.body.username}, function (err, user) {
      if (err) return res.status(500).send("Server error");
      return user;
    }).then(function(user) {
      if (user) return res.status(409).send("User already exists");

      var hashedPassword = bcrypt.hashSync(req.body.password, 8);

      var user = new User({
      	username: 		req.body.username,
      	password: 		hashedPassword
      });

    	user.save(function(err) {
    		if(!err) {
    			console.log('User created');
    		} else {
    			console.log('ERROR: ' + err);
    		}
    	});

      var token = createToken(user._id);

      res.status(201).send({ auth: true, token: req.token });
    }).catch(function(err) {
        return res.status(500).send("Error registering the user");
    });
  });

  router.get('/me', verifyToken, function(req, res) {
    User.findById(req.userId, { password: 0 }, function (err, user) {
      if (err) return res.status(500).send("There was a problem finding the user.");
      if (!user) return res.status(404).send("No user found.");

      res.status(200).send(user);
    });
  });

  router.post('/login', function(req, res, next) {
    User.findOne({ username: req.body.username }, function (err, user) {
      if (err) return res.status(500).send('Error on the server.');
      if (!user) return res.status(404).send('No user found.');
      var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
      if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });
      var token = createToken(user._id);
      res.status(200).send({ auth: true, token: token });
    });
  });

  app.use('/api/auth', router);
}
