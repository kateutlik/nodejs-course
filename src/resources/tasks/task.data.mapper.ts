import { AbstractDataMapper } from '../abstract/abstract.data.mapper';
import { ITask } from './task.interface';

export class TaskDataMapper extends AbstractDataMapper {
  static toDomain(entity: ITask): ITask {
    return entity;
  }
}
