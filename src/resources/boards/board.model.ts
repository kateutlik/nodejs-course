import uuid from 'uuid';
import { IBoard } from './board.interface';
import { IColumn } from './column.interface';

export class Board implements IBoard {
  public id: string;
  public title: string;
  public columns: IColumn[];

  constructor({
    id = uuid.v4(),
    title = 'Board title',
    columns = []
  } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }

  public toString(): string {
    return `${this.title}`;
  }
}
