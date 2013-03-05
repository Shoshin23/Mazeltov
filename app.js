
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');
  , passport = require('passport');

var env = process.env.NODE_ENV || 'development'
  , config = require('./config/config')[env]
  , auth = require('./config/middlewares/authorization')
  , mongoose = require('mongoose');

  //Bootstrap db connection
  mongoose.connect(config.db)
//get the models onboard
  var models_path = __dirname + '/app/models'
  fs.readdirSync(models_path).forEach(function(file) {
	  require(models_path + '/'+file)
  })

//get the passport configs on board
var require('./config/passport')(passport,config)

var app = express();
//get the express configs on board
require('./config/express')(app,config,passport)
//get the routes configs onboard
require('./config/routes')(app,passport,auth)

var port = process.env.PORT || 3000

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
