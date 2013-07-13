var nunjucks = require('nunjucks'),
  nodemailer = require('nodemailer'),
  express = require('express'),
  path = require('path');

module.exports = function(app, mongoose, connection, transport) {
  var transport = nodemailer.createTransport(transport.type, transport.configuration);
  require('./models/Email').initialise(mongoose, connection, transport)

  var nunjucksEnvironment = app.get('nunjucksEnvironment');
  var viewsPath = path.resolve(path.join(__dirname, 'views'));
  console.log(viewsPath)
  nunjucksEnvironment.loaders.push(new nunjucks.FileSystemLoader(viewsPath));

  app.use('/email-assets', express.static(__dirname + '/../public'));
}
