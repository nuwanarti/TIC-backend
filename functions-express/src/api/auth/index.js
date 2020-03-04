const express = require('express')
const { controller } = require('./auth.controller')
// import controller from './auth.controller'

var router = express.Router();
router.post('/authenticate',  controller.authenticate);

module.exports = {
  AuthRoutes: router
}
// export default router
