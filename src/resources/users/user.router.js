const router = require('express').Router();
const userService = require('./user.service');

router
  .route('/')
  .get(userService.getAll)
  .post(userService.create);

router
  .route('/:id')
  .get(userService.getById)
  .put(userService.putById)
  .delete(userService.deleteById);

module.exports = router;
