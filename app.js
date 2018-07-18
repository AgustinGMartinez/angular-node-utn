var express  = require("express"),
    app      = express(),
    http     = require("http"),
    server   = http.createServer(app),
    mongoose = require('mongoose'),
    cors     = require('cors'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    port = process.env.PORT || 3000,
    path = require('path');

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

routes = require('./routes/api')(app);

// mongoose.connect('mongodb://localhost:27017/workouts',{ useNewUrlParser: true }, function(err, res) {
mongoose.connect('mongodb://zhuclam:fjv2ibvgmkl147@ds139921.mlab.com:39921/agustin-utn',{ useNewUrlParser: true }, function(err, res) {
	if(err) {
		console.log('ERROR: connecting to Database. ' + err);
	} else {
		console.log('Connected to the workout mongo database');
	}
});

server.listen(port, "0.0.0.0", function() {
  console.log("Node server running on http://localhost:" + port);
});
