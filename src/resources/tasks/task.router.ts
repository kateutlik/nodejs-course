import express from 'express'
import taskController from './task.controller';

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(taskController.find)
  .post(taskController.create);

router
  .route('/:id')
  .get(taskController.findById)
  .put(taskController.update)
  .delete(taskController.delete);

export default router;
