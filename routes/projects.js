const router = require('express').Router();
const {
  getProjects,
  createProject,
  getProject,
  deleteProject,
  updateProject,
} = require('../controllers/projects');
const bodyValidation = require('../middleware/body-validation');
const paramValidation = require('../middleware/param-validation');
const queryHandler = require('../middleware/query-handler');
const imageHandler = require('../middleware/image-handler');
const Project = require('../models/Project');

router
  .route('/')
  .get(queryHandler(Project), getProjects)
  .post(imageHandler, bodyValidation(Project, 'create'), createProject);

router
  .route('/:id')
  .get(paramValidation, getProject)
  .delete(paramValidation, deleteProject)
  .put(paramValidation, imageHandler, bodyValidation(Project), updateProject);

module.exports = router;
