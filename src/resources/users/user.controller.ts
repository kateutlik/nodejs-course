import { Request, Response } from 'express';
import userService from './user.service';
import httpStatus from 'http-status';

import * as MESSAGES from './user.constants';

class UserController {
  private static instance: UserController;

  constructor(
  ) {
    if(!UserController.instance){
      UserController.instance = this;
    }

    return UserController.instance;
  }

  public async find(req: Request, res: Response): Promise<void> {
    try {
      const users = await userService.find();
      if (users) {
        res.status(httpStatus.OK).json(users);
      } else {
        res.status(httpStatus.NOT_FOUND).json(MESSAGES.USERS_NOT_FOUND);
      }
    } catch (e) {
      res.status(httpStatus.NOT_FOUND).json(MESSAGES.USERS_NOT_FOUND);
    }
  }

  public async findById(req: Request, res: Response): Promise<void> {
    try {
      const user = await userService.findById(req.params.id);
      if (user) {
        res.status(httpStatus.OK).json(user);
      } else {
        res.status(httpStatus.NOT_FOUND).json(MESSAGES.USER_NOT_FOUND);
      }
    } catch (e) {
      res.status(httpStatus.NOT_FOUND).json(MESSAGES.USER_NOT_FOUND);
    }
  }

  public async create(req: Request, res: Response): Promise<void> {
    try {
      const user = await userService.create(req.body);
      console.log(user);
      if (user) {
        res.status(httpStatus.OK).json(user);
      } else {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json(MESSAGES.USER_NOT_CREATED);
      }
    } catch (e) {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json(MESSAGES.USER_NOT_CREATED);
    }
  }

  public async update(req: Request, res: Response): Promise<void> {
    try {
      const user = await userService.update(req.params.id, req.body);
      console.log(user);
      if (user) {
        res.status(httpStatus.OK).json(user);
      } else {
        res.status(httpStatus.NOT_FOUND).json(MESSAGES.USER_NOT_FOUND);
      }
    } catch (e) {
      res.status(httpStatus.NOT_FOUND).json(MESSAGES.USER_NOT_FOUND);
    }
  }

  public async delete(req: Request, res: Response): Promise<void> {
    try {
      const user = await userService.delete(req.params.id);
      console.log(user);
      if (user) {
        res.status(httpStatus.OK).json(user);
      } else {
        res.status(httpStatus.NOT_FOUND).json(MESSAGES.USER_NOT_FOUND);
      }
    } catch (e) {
      res.status(httpStatus.NOT_FOUND).json(MESSAGES.USER_NOT_FOUND);
    }
  }
}

const instance = new UserController();
Object.freeze(instance);

export default instance;