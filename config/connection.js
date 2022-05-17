const { connect, connection } = require('mongoose');

// Wrap Mongoose around local connection to MongoDB
// localhost = 127.0.0.1:27017
connect('mongodb://localhost/socialnetworkapi', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Export connection
module.exports = connection;
