var nodemailer = require('nodemailer'),
  path = require('path');

module.exports = function(app, mongoose, connection, transport) {
  var transport = nodemailer.createTransport(transport.type, transport.configuration);
  require('./models/Email').initialise(mongoose, connection, transport)
}
