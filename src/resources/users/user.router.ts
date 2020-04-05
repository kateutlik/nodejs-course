import express from 'express'
import userController from './user.controller';

const router = express.Router();

router
  .route('/')
  .get(userController.find)
  .post(userController.create);

router
  .route('/:id')
  .get(userController.findById)
  .put(userController.update)
  .delete(userController.delete);

export default router;
