const { AuthRoutes } = require('../api/auth')
const { UserRoutes } = require('../api/user')
const { ProjectRoutes } = require('../api/project')

module.exports = {
  auth: AuthRoutes,
  projects: ProjectRoutes,
  users: UserRoutes
}
