const router = require('express').Router();
const users = require('./users');
const charitableProjectReqs = require('./charitable-project-req');
const profitableProjectReqs = require('./profitable-project-req');
const notFound = require('./not-found');
const project = require('./projects');

const ROUTE_PREFIX = '/api/v1';

router.use(`${ROUTE_PREFIX}/users`, users);
router.use(`${ROUTE_PREFIX}/charitableProjectReqs`, charitableProjectReqs);
router.use(`${ROUTE_PREFIX}/profitableProjectReqs`, profitableProjectReqs);
router.use(`${ROUTE_PREFIX}/project`, project);
router.use('*', notFound); // page not found error handler

module.exports = router;
