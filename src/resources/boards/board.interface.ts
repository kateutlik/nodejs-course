import { IColumn } from './column.interface';

export interface IBoardBody {
  title: string,
  columns: IColumn[]
}
export interface IBoard extends IBoardBody {
  id: string
}