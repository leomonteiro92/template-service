var bodyParser = require('body-parser');
var express = require('express');
var glob = require('glob');
var helmet = require('helmet');
var mongoose = require('mongoose');
var morgan = require('morgan');
var passport = require('passport');

var config = require('./config');
require('./passport');

var app = express();

mongoose.connect(config.mongo.url);

app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, X-Requested-With, Authorization");
  next();
});
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('tiny'));

var models = glob.sync('./models/*.js');
models.forEach(function (model) {
  require(model);
});
var routes = glob.sync('./routes/*.js');
routes.forEach(function (route) {
  require(route)(app);
});

app.listen(config.server.port, function () {
  console.log('Express server listening on port: ' + config.server.port);
});

module.exports = app;
