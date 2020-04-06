import { Request, Response } from 'express';
import taskService from './task.service';
import httpStatus from 'http-status';

import * as MESSAGES from './task.constants';

class TaskController {
  private static instance: TaskController;

  constructor(
  ) {
    if(!TaskController.instance){
      TaskController.instance = this;
    }

    return TaskController.instance;
  }

  public async find(req: Request, res: Response): Promise<void> {
    try {
      const tasks = await taskService.findByBoardId(req.params.boardId);
      if (tasks && tasks.length) {
        res.status(httpStatus.OK).json(tasks);
      } else {
        res.status(httpStatus.NOT_FOUND).json(MESSAGES.TASKS_NOT_FOUND);
      }
    } catch (e) {
      res.status(httpStatus.NOT_FOUND).json(MESSAGES.TASKS_NOT_FOUND);
    }
  }

  public async findById(req: Request, res: Response): Promise<void> {
    try {
      const task = await taskService.findById(req.params.id, req.params.boardId);
      if (task) {
        res.status(httpStatus.OK).json(task);
      } else {
        res.status(httpStatus.NOT_FOUND).json(MESSAGES.TASK_NOT_FOUND);
      }
    } catch (e) {
      res.status(httpStatus.NOT_FOUND).json(MESSAGES.TASK_NOT_FOUND);
    }
  }

  public async create(req: Request, res: Response): Promise<void> {
    try {
      const task = await taskService.create(req.params.boardId, req.body);
      console.info(task);
      if (task) {
        res.status(httpStatus.OK).json(task);
      } else {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json(MESSAGES.TASK_NOT_CREATED);
      }
    } catch (e) {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json(MESSAGES.TASK_NOT_CREATED);
    }
  }

  public async update(req: Request, res: Response): Promise<void> {
    try {
      const task = await taskService.update(req.params.id, req.params.boardId, req.body);
      console.info(task);
      if (task) {
        res.status(httpStatus.OK).json(task);
      } else {
        res.status(httpStatus.NOT_FOUND).json(MESSAGES.TASK_NOT_FOUND);
      }
    } catch (e) {
      res.status(httpStatus.NOT_FOUND).json(MESSAGES.TASK_NOT_FOUND);
    }
  }

  public async delete(req: Request, res: Response): Promise<void> {
    try {
      const task = await taskService.delete(req.params.id, req.params.boardId);
      console.log(task);
      if (task) {
        res.status(httpStatus.OK).json(task);
      } else {
        res.status(httpStatus.NOT_FOUND).json(MESSAGES.TASK_NOT_FOUND);
      }
    } catch (e) {
      res.status(httpStatus.NOT_FOUND).json(MESSAGES.TASK_NOT_FOUND);
    }
  }
}

const instance = new TaskController();
Object.freeze(instance);

export default instance;