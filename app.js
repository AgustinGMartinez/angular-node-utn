var express  = require("express"),
    app      = express(),
    http     = require("http"),
    server   = http.createServer(app),
    mongoose = require('mongoose'),
    cors     = require('cors'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    port = process.env.PORT || 3000,
    path = require('path'),
    config = require('./config.js');

require('dotenv').config();

app.use(cors());

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(methodOverride()); //methodOverride nos permite implementar y personalizar metodos HTTP


app.use(express.static(path.join(__dirname,'public/dist/angular')));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname,'public/dist/angular/index.html'));
});

apiRoutes = require('./routes/api')(app);
authRoutes = require('./auth/authController')(app, config);

let prod_db = process.env.DB_HOST + "://" + process.env.DB_USER + ":" + process.env.DB_PASSWORD + "@ds139921.mlab.com:39921/" + process.env.DB_NAME;

let db = (s=false) => s ? prod_db : "mongodb://localhost:27017/workouts";

mongoose.connect(db(false) ,{ useNewUrlParser: true }, function(err, res) {
	if(err) {
		console.log('ERROR: connecting to Database. ' + err);
	} else {
		console.log('Connected to the workout mongo database');
	}
});

server.listen(port, "0.0.0.0", function() {
  console.log("Node server running on http://localhost:" + port);
});
