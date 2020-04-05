import { IAbstract } from './abstract.types';

export abstract class AbstractDataMapper {
  static toDomain(entity: IAbstract) {
    return entity;
  }

  static toDalEntity(domain: IAbstract) {
    return domain;
  }
}
