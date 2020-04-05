import express from 'express'
import boardController from './board.controller';

const router = express.Router();

router
  .route('/')
  .get(boardController.find)
  .post(boardController.create);

router
  .route('/:id')
  .get(boardController.findById)
  .put(boardController.update)
  .delete(boardController.delete);

export default router;
