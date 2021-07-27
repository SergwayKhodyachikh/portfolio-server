const _ = require('lodash');
const User = require('../models/User');
const ServerError = require('../utils/server-error');

const concealSensitiveInfo = data => _.pick(data, ['id', 'name', 'email']);

exports.getUser = async (req, res) => {
  const user = await User.findByPk(req.user.id, { attributes: ['id', 'email', 'name'] });

  if (!user) throw new ServerError('The user with the given ID was not found.', 404);

  res.status(200).send({
    status: 'success',
    user,
  });
};

exports.deleteUser = async (req, res) => {
  const user = await User.findByPk(req.user.id);

  if (!user) throw new ServerError('The user with the given ID was not found.', 404);

  await user.destroy();
  res.status(204).json({
    status: 'success',
    user: null,
  });
};

exports.createUser = async (req, res) => {
  let user = await User.findOne({ where: { email: req.body.email } });
  if (user) throw new ServerError('User already registered', 400);

  user = await User.create(_.pick(req.body, ['email', 'password', 'role', 'name']));

  const token = user.generateAuthToken();

  res
    .header('Authorization', token)
    .status(201)
    .send({
      status: 'success',
      token,
      user: concealSensitiveInfo(user),
    });
};

exports.userLogin = async (req, res) => {
  const user = await User.findOne({ where: { email: req.body.email } });
  if (!user) throw new ServerError('Invalid credentials', 400);

  const validPassword = await user.comparePassword(req.body.password);
  if (!validPassword) throw new ServerError('Invalid credentials', 400);
  const token = user.generateAuthToken();

  res.header('Authorization', token).send({
    status: 'success',
    token,
    user: concealSensitiveInfo(user),
  });
};
