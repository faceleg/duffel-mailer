var EmailSchema = null,
  Email = null,
  sendTransport = null;

var initialiseSchema = function(mongoose, connection) {

  EmailSchema = new mongoose.Schema({
    to: {
      type: String,
      required: true
    },
    from: {
      type: String,
      required: true
    },
    cc: {
      type: String,
    },
    bcc: {
      type: String,
    },
    subject: {
      type: String,
      required: true
    },
    html: {
      type: String,
      required: true
    },
    text: {
      type: String,
    },
    headers: {
      type: Object,
      required: true
    },
    responseStatus: {
      type: Object
    },
    error: {
      type: Object
    },
    sent: {
      type: Boolean
    }
  });

  EmailSchema.methods.send = function(callback) {
    this.save(function(error, email) {
      if (error) {
        return callback(error);
      }
      var mailOptions = {
        to: email.to,
        from: email.from,
        cc: email.cc,
        bcc: email.bcc,
        subject: email.subject,
        html: email.html,
        text: email.text,
        headers: email.headers,
        generateTextFromHTML: true
      };
      sendTransport.sendMail(mailOptions, function(error, responseStatus) {
        if (error) {
          email.sent = false;
          email.error = error;
          return email.save(function(saveError) {
            if (saveError) {
              return callback(saveError);
            }
            return callback(error);
          });
        }
        email.responseStatus = responseStatus;
        email.sent = true;
        email.save(callback);
      });
    });
  }

  Email = connection.model('Email', EmailSchema);
}

module.exports = {
  initialise: function(mongoose, connection, transport) {
    sendTransport = transport;
    initialiseSchema(mongoose, connection);
  },
  model: function() {
    return Email;
  }
};
