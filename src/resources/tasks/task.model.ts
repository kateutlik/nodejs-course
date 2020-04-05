import uuid from 'uuid';
import { ITask } from './task.interface';

export class Task implements ITask {
  public id: string;
  public title: string;
  public order: number;
  public description: string;
  public userId: null | string;
  public boardId: string;
  public columnId: null | string;

  constructor({
    id = uuid.v1(),
    title = 'Task 1',
    order = 0,
    description = 'Description',
    userId = null,
    boardId = '',
    columnId = null
  } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }

  public toString(): string {
    return `${this.title} (${this.description})`;
  }
}


