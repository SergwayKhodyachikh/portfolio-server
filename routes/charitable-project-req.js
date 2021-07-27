const router = require('express').Router();
const bodyValidation = require('../middleware/body-validation');
const CharitableProjectReq = require('../models/CharitableProjectReq');
const queryHandler = require('../middleware/query-handler');
const paramValidation = require('../middleware/param-validation');
const {
  getCharitableProjectRequests,
  createCharitableProjectRequest,
  getCharitableProjectRequest,
  updateCharitableProjectRequest,
  deleteCharitableProjectRequest,
} = require('../controllers/charitable-project-req');

router
  .route('/')
  .get(queryHandler(CharitableProjectReq), getCharitableProjectRequests)
  .post(bodyValidation(CharitableProjectReq, 'create'), createCharitableProjectRequest);

router
  .route('/:id')
  .get(paramValidation('id'), getCharitableProjectRequest)
  .put(
    paramValidation('id'),
    bodyValidation(CharitableProjectReq, 'create'),
    updateCharitableProjectRequest,
  )
  .delete(paramValidation('id'), deleteCharitableProjectRequest);

module.exports = router;
