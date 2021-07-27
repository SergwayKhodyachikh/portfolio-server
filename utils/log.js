const { cyan, green, red } = require('chalk');

const { log, error } = console;

/**
 * colored logger util
 */
module.exports = {
  /**
   * @param {String} term
   */
  success: term => log(green(term)),
  /**
   * @param {String} term
   */
  failure: term => error(red(term)),
  /**
   * @param {String} term
   */
  query: term => log(cyan(`\n${term}\n`)),
};
