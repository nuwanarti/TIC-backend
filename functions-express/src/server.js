// const admin = require('firebase-admin');

const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const Routes = require('./router')

// const admin = require('firebase-admin');
// admin.initializeApp();
// const db = admin.firestore();
// const { db } = require('./db')

const app = express();

app.use(cors({origin: true}));
app.use(bodyParser.json())

app.use('/', Routes.auth)
app.use('/projects', Routes.projects)
app.use('/users', Routes.users)


module.exports = {
  app
};
