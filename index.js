var Email = null,
  config = null;

module.exports = {
  initialise: function(app, mongoose, connection, emailConfig){
    config = emailConfig;
    require('./lib/initialise')(app, mongoose, connection, emailConfig.transport);
    Email = require('./lib/models/Email').model();
  },
  send: function(options, callback) {
    options.from = config.defaults.from;
    var email = new Email(options);
    email.send(callback);
  }
}
