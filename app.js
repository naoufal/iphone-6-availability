// NPM MODULES
var http    = require('http');
var _       = require('lodash');

// MODULES
var pollAvailability = require('./lib/poll-availability');

// ENV VARIABLES
var PORT  = process.env.PORT || 5000; // server port
var EMAIL = process.env.EMAIL; // email you want to send notifications to
var STORE = process.env.STORE; // store you want to watch
var MODEL = process.env.MODEL; // iPhone 6 model you want to watch



http.createServer(function(req, res) {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({
    store: STORE,
    model: MODEL
  }));
}).listen(PORT, function(){
  console.log('server started on port ' + PORT);
  pollAvailability.start();
});

