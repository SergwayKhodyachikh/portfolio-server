const { generateArr, generateProfitableProjectRequest } = require('../../utils/generate-data');
const { objFromCamelCaseToSnakeCase } = require('../../utils/object-modification');

const MIN_CHARITABLE_REQUESTS_CREATED = 20;
const MAX_CHARITABLE_REQUEST_CREATED = 21;

module.exports = {
  up: queryInterface =>
    queryInterface.bulkInsert(
      'profitable_project_reqs',
      generateArr(
        generateProfitableProjectRequest,
        MAX_CHARITABLE_REQUEST_CREATED,
        MIN_CHARITABLE_REQUESTS_CREATED,
      ).map(charitableProjectRequest => objFromCamelCaseToSnakeCase(charitableProjectRequest)),
      {},
    ),
  down: queryInterface => queryInterface.bulkDelete('profitable_project_reqs', null, {}),
};
