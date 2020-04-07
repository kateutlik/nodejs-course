import uuid from 'uuid';
import { ITask } from './task.interface';

export class Task implements ITask {
  public id: string;
  public title: string;
  public order: number;
  public description: string;
  public userId: string | null;
  public boardId: string;
  public columnId: null | string;

  constructor({
    id = uuid.v4(),
    title = 'Task 1',
    order = 0,
    description = 'Description',
    userId = '',
    boardId = '',
    columnId = null
  } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId || null;
    this.boardId = boardId;
    this.columnId = columnId || null;
  }

  public toString(): string {
    return `${this.title} (${this.description})`;
  }
}


