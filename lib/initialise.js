module.exports = function(app, mongoose, connection) {
  require('./models/Email').initialise(mongoose, connection)

  var nunjucksEnvironment = app.get('nunjucksEnvironment');
  nunjucksEnvironment.loaders.push(new nunjucks.FileSystemLoader(path.resolve(path.join(__dirname, 'views'))));

  app.use('/email-assets', express.static(__dirname + '/../public'));
}
