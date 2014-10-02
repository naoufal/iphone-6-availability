// NPM MODULES
var _       = require('lodash');
var cronJob = require('cron').CronJob;
var request = require('superagent');

// ENV VARIABLES
var EMAIL = process.env.EMAIL; // email you want to send notifications to
var STORE = process.env.STORE; // store you want to watch
var MODEL = process.env.MODEL; // iPhone 6 model you want to watch

// CONSTANTS
var URL   = {
  availability: 'https://reserve.cdn-apple.com/CA/en_CA/reserve/iPhone/availability.json',
  stores: 'https://reserve.cdn-apple.com/CA/en_CA/reserve/iPhone/stores.json'
};

// MODULES
var mailer = require('./mailer');



var requestAvailability = function() {
  request
    .get(URL.availability)
    .set({
      'Accept': 'application/json, text/javascript, */*; q=0.01',
      'Accept-Encoding': 'gzip,deflate,sdch',
      'Accept-Language': 'en-US,en;q=0.8,fr;q=0.6',
      'Cache-Control': 'max-age=0',
      'Connection': 'keep-alive',
      'Host': 'reserve.cdn-apple.com',
      'If-Modified-Since': new Date(),
      'If-None-Match': '1217a7-3506-504661475e800',
      'Referer': 'https://reserve.cdn-apple.com/CA/en_CA/reserve/iPhone/availability',
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2062.124 Safari/537.36',
      'X-Requested-With': 'XMLHttpRequest'
    })
    .end(function(err, res){
      if (err) {
        return console.log(err);
      }

      if (!_.isEmpty(res.body) && res.body[STORE][MODEL]) {
        console.log('model is available');

        return mailer.sendMail(function(err, success){
          if (err) {
            console.log(err);
          } else {
            console.log('Message sent: ' + success.response);
          }
        });
      }
      console.log('model not available');
    });
};



module.exports = new cronJob({
  // every hour
  cronTime: '*/20 * * * *',
  onTick: function() {
    requestAvailability();
  },
  start: false
});

