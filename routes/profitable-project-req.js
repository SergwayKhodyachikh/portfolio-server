const router = require('express').Router();
const bodyValidation = require('../middleware/body-validation');
const ProfitableProjectReq = require('../models/ProfitableProjectReq');
const queryHandler = require('../middleware/query-handler');
const {
  getProfitableProjectRequests,
  getProfitableProjectRequest,
  deleteProfitableProjectRequest,
  createProfitableProjectRequest,
  updateProfitableProjectRequest,
} = require('../controllers/profitable-project-req');
const paramValidation = require('../middleware/param-validation');

router
  .route('/')
  .get(queryHandler(ProfitableProjectReq), getProfitableProjectRequests)
  .post(bodyValidation(ProfitableProjectReq, 'create'), createProfitableProjectRequest);

router
  .route('/:id')
  .get(paramValidation('id'), getProfitableProjectRequest)
  .put(
    paramValidation('id'),
    bodyValidation(ProfitableProjectReq, 'create'),
    updateProfitableProjectRequest,
  )
  .delete(paramValidation('id'), deleteProfitableProjectRequest);

module.exports = router;
