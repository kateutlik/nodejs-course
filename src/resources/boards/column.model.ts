import uuid from 'uuid';
import { IColumn } from './column.interface';

// @ts-ignore
export class Column implements IColumn {
  private id: string;
  private title: string;
  private order: number;

  constructor({
    id = uuid.v1(),
    title = 'title',
    order = 0
  } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
  }
}
