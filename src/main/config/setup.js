const cors = require('../middwares/cors')
module.exports = app => {
  app.disable('x-powered-by')

  app.use(cors)
}
