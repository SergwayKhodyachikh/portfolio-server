const { failure } = require('../utils/log');

module.exports = () => {
  /**
   * log the error description and exit the application
   * @param ex error description
   * @type {NodeJS.UnhandledRejectionListener}
   */
  const handleEx = ex => {
    failure(ex);
    process.exit(1);
  };

  process.on('uncaughtException', handleEx);
  process.on('unhandledRejection', handleEx);
};
