var nodemailer = require('nodemailer');

var EMAIL       = process.env.EMAIL;
var PASSWORD    = process.env.PASSWORD;
var RESERVE_URL = 'https://reserve.cdn-apple.com/CA/en_CA/reserve/iPhone/availability';

var transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: EMAIL,
    pass: PASSWORD
  }
});

var sendMail = function(cb){
  if (!EMAIL || !PASSWORD) {
    return console.log('You forgot to add your email or pass your ENV variables');
  }

  transporter.sendMail({
    from: EMAIL,
    to: EMAIL,
    subject: 'Your iPhone 6 is available!',
    html: 'Your iPhone 6 is available!  Reserve it, <a href=' + RESERVE_URL + '>here</a>.',
    generateTextFromHTML: true
  }, cb);
};

module.exports.sendMail = sendMail;
