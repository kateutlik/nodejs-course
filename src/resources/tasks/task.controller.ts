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
      const tasks = await taskService.find();
      res.status(httpStatus.OK).json(tasks);
    } catch (e) {
      res.status(httpStatus.NOT_FOUND).json(MESSAGES.TASKS_NOT_FOUND);
    }
  }

  public async findById(req: Request, res: Response): Promise<void> {
    try {
      const task = await taskService.findById(req.params.id, req.params.boardId);
      res.status(httpStatus.OK).json(task);
    } catch (e) {
      res.status(httpStatus.NOT_FOUND).json(MESSAGES.TASK_NOT_FOUND);
    }
  }

  public async create(req: Request, res: Response): Promise<void> {
    try {
      console.log(req.params);
      const task = await taskService.create(req.params.boardId, req.body);
      res.status(httpStatus.OK).json(task);
    } catch (e) {
      res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json(MESSAGES.TASK_NOT_CREATED);
    }
  }

  public async update(req: Request, res: Response): Promise<void> {
    try {
      const task = await taskService.update(req.params.id, req.params.boardId, req.body);
      res.status(httpStatus.OK).json(task);
    } catch (e) {
      res.status(httpStatus.NOT_FOUND).json(MESSAGES.TASK_NOT_FOUND);
    }
  }

  public async delete(req: Request, res: Response): Promise<void> {
    try {
      const task = await taskService.delete(req.params.id, req.params.boardId);
      console.log(task)
      if (!task) res.status(httpStatus.NOT_FOUND).json(MESSAGES.TASK_NOT_FOUND);
      res.status(httpStatus.OK).json(task);
    } catch (e) {
      res.status(httpStatus.NOT_FOUND).json(MESSAGES.TASK_NOT_FOUND);
    }
  }
}

const instance = new TaskController();
Object.freeze(instance);

export default instance;