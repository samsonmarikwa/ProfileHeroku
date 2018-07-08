var express = require('express');

var app = express();

app.set('port', process.env.PORT || 8080);

app.use(express.static('public'));

require('./routes/html-routes.js')(app);

app.listen(app.get('port'), () => {
    console.log('Server running on port: ' + app.get('port'));
});