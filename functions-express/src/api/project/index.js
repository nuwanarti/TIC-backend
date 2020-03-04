const express = require('express')
const { controller } = require('./project.controller')
// import controller from './auth.controller'

var router = express.Router();
router.get('/getProjects',  controller.getProjects);

router.post('/create', controller.createProject);

router.get('/getCurrentFiles', controller.getCurrentFiles);

router.get('/getHistoryFiles', controller.getHistoryFiles);

router.post('/createLatestSnap', controller.createLatestSnap);

router.post('/addSnapHistory', controller.addSnapHistory);

router.post('/:id/archive', controller.archiveProject);
router.post('/:id/unarchive', controller.unarchiveProject);

router.get('/getArchivedProjects', controller.getArchivedProjects);

module.exports = {
  ProjectRoutes: router
}
// export default router
