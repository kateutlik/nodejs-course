import { AbstractDataMapper } from '../abstract/abstract.data.mapper';
import { IBoard } from './board.interface';

export class BoardDataMapper extends AbstractDataMapper {
  static toDomain(entity: IBoard): IBoard {
    return entity;
  }
}
