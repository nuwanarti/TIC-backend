const express = require('express')
const { controller } = require('./user.controller')

const router = express.Router();

router.route('/')
  .get( controller.getUsers )
  .post( controller.createUser );

// router.route('/users/authenticate')
//   .post(controller.authenticate);
//
// router.route('/users/:id')
//   .get(authorize(), controller.getUserById);
//
// router.route('/users/:id/org/:orgId')
//   .post(authorize(Role.Admin), controller.addUserToOrg);

module.exports = {
  UserRoutes: router
}
