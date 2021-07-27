require('./init/handle-process')();
require('express-async-errors');
const app = require('express')();
const morgan = require('morgan');
const { setupCors } = require('./init/setup-cors');
const { setupParser } = require('./init/setup-parser');
const errorRequestHandler = require('./middleware/error-request-handler');
const routes = require('./routes');

const database = require('./config/database');
const { PORT, env } = require('./config/env');
const log = require('./utils/log').success;

module.exports = (async () => {
  // database initialize
  await database.validate();
  // setup request logger
  if (env.isDev) app.use(morgan('dev'));
  setupParser(app);
  setupCors(app);
  app.use(routes);
  app.use(errorRequestHandler);

  return app.listen(PORT, () => log(`listening on port ${PORT}`));
})();
