
/**
 * Module dependencies.
 */

var AppConfig = {};
AppConfig.run_interval = 6000;

var express = require('express')
	, app = express.createServer()
 	, io = require('socket.io').listen(app, {origins: '*:*'});	

io.configure(function () { 
  io.set("transports", ["xhr-polling"]); 
  io.set("polling duration", 10); 
});

require('./http_controllers')(app);
require('./models');


// Configuration
app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.set("json callback", true);
	app.use(express.static(__dirname + '/public'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.cookieParser());
  app.use(express.logger({ format: ':method :url' }));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

io.sockets.on('connection', function (socket) {
	require('./socket_controllers')(socket);
});

if (!module.parent) {	
	var port = process.env.PORT || 4000;
  app.listen(port);
	console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
}
