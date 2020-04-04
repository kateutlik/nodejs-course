const router = require('express').Router();
const User = require('./user.model');
const userService = require('./user.service');

router.route('/').get(async (req, res) => {
  const users = await userService.getAll();
  res.status(200).json(users.map(User.toResponse));
});

router.route('/:id').get(async (req, res) => {
  const user = await userService.getUserById(req.params.id);
  if (!user) {
    res.status(404).send('User with the given id was not found');
  } else {
    res.status(200).json(User.toResponse(user));
  }
});

router.route('/').post(async (req, res) => {
  const user = await userService.createUser(new User({ ...req.body }));
  if (!user) {
    res.status(404).send('User was not created');
  } else {
    res.status(200).json(User.toResponse(user));
  }
});

router.route('/:id').put(async (req, res) => {
  const user = await userService.updateUser(req.params.id, req.body);
  if (!user) {
    res.status(404).send('User with the given id was not found');
  } else {
    res.status(200).json(User.toResponse(user));
  }
});

router.route('/:id').delete(async (req, res) => {
  const user = await userService.deleteById(req.params.id);
  if (!user) {
    res.status(404).send('User with the given id was not found');
  } else {
    res.status(200).json(User.toResponse(user));
  }
});

module.exports = router;
