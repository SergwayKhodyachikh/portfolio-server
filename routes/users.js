const router = require('express').Router();
const User = require('../models/User');
const { userLogin, createUser, getUser, deleteUser } = require('../controllers/user');
const auth = require('../middleware/auth');
const bodyValidation = require('../middleware/body-validation');

router
  .route('/')
  .get(auth, getUser)
  .post(bodyValidation(User, 'create'), createUser)
  .delete(auth, deleteUser);

router.post('/login', bodyValidation(User, 'login'), userLogin);

module.exports = router;
