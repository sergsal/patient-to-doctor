var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var helpers = require('./lib/helpers.js');

// Initialize Express
var app = express();
app.set('port', (process.env.PORT || 3000));

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static(process.cwd() + '/public'));

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());

// Override with POST having ?_method=DELETE
app.use(methodOverride('_method'));

// Engine Setup
var exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({
	defaultLayout: 'main',
	helpers: helpers
}));
app.set('view engine', 'handlebars');

// Prepare Tables
var models  = require('./models');
var sequelizeConnection = models.sequelize;
sequelizeConnection.sync(); // {force:true} drops table data on server start.

// Routing Setup
var public_routes = require('./controllers/public_controller.js');
var physicians_routes = require('./controllers/physicians_controller.js');
var profile_routes = require('./controllers/profile_controller.js');

// TODO: routes for authenticating physician users

// TODO: routes for authenticated physician users (Create, Update, Delete)
//var physician_user_routers = require('./controllers/physicians_controller.js');

app.use('/', public_routes);
app.use('/dr', profile_routes);
app.use('/physicians', physicians_routes);

// Listening
app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});