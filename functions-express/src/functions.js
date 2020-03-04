const functions = require('firebase-functions');

// Express Servers
const { app } = require('./server');

// HTTP Cloud Functions
const cors = functions.https.onRequest(app);

module.exports = {
  cors,
};
