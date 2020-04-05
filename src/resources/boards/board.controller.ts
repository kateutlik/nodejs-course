import { Request, Response } from 'express';
import boardService from './board.service';
import httpStatus from 'http-status';

import * as MESSAGES from './board.constants';

class BoardController {
  private static instance: BoardController;

  constructor(
  ) {
    if(!BoardController.instance){
      BoardController.instance = this;
    }

    return BoardController.instance;
  }

  public async find(req: Request, res: Response): Promise<void> {
    try {
      const boards = await boardService.find();
      res.status(httpStatus.OK).json(boards);
    } catch (e) {
      res.status(httpStatus.NOT_FOUND).json(MESSAGES.BOARDS_NOT_FOUND);
    }
  }

  public async findById(req: Request, res: Response): Promise<void> {
    try {
      const board = await boardService.findById(req.params.id);
      res.status(httpStatus.OK).json(board);
    } catch (e) {
      res.status(httpStatus.NOT_FOUND).json(MESSAGES.BOARD_NOT_FOUND);
    }
  }

  public async create(req: Request, res: Response): Promise<void> {
    try {
      const board = await boardService.create(req.body);
      res.status(httpStatus.OK).json(board);
    } catch (e) {
      res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json(MESSAGES.BOARD_NOT_CREATED);
    }
  }

  public async update(req: Request, res: Response): Promise<void> {
    try {
      const board = await boardService.update(req.params.id, req.body);
      res.status(httpStatus.OK).json(board);
    } catch (e) {
      res.status(httpStatus.NOT_FOUND).json(MESSAGES.BOARD_NOT_FOUND);
    }
  }

  public async delete(req: Request, res: Response): Promise<void> {
    try {
      const board = await boardService.delete(req.params.id);
      if (!board) res.status(httpStatus.NOT_FOUND).json(MESSAGES.BOARD_NOT_FOUND);
      res.status(httpStatus.OK).json(board);
    } catch (e) {
      res.status(httpStatus.NOT_FOUND).json(MESSAGES.BOARD_NOT_FOUND);
    }
  }
}

const instance = new BoardController();
Object.freeze(instance);

export default instance;