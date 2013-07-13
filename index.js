module.exports = {
  initialise: require('./lib/initialise'),
  Email: function() {
    return require('./lib/models/Email').model();
  }
}
