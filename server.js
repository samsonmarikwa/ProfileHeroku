var express = require('express');
var bodyParser = require('body-parser');

var app = express();

//set port for express
app.set('port', process.env.PORT || 8080);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());

// serve static content for the app from the public directory in the application directory
app.use(express.static('public'));

// import routes and give the server access to them
require('./routes/html-routes.js')(app);
require('./routes/api-routes.js')(app);

//start server and listen for requests
app.listen(app.get('port'), () => {
    console.log('Server running on port: ' + app.get('port'));
});