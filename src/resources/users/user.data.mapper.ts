import { AbstractDataMapper } from '../abstract/abstract.data.mapper';
import { IUser, IUserDomain } from './user.interface';

export class UserDataMapper extends AbstractDataMapper {
  static toDomain(entity: IUser): IUserDomain {
    const { id, name, login } = entity;
    return { id, name, login };
  }
}
