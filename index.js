var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.get('/issues', function(request, response) {
  response.render('pages/issues');
});

app.get('/issues2', function(request, response) {
  response.render('pages/issues2');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
