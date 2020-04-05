import uuid from 'uuid';
import { IUser } from './user.interface';

export class User implements IUser {
  public id: string;
  public name: string;
  public login: string;
  public password: string;

  constructor({
    id = uuid.v1(),
    name = 'USER',
    login = 'user',
    password = 'P@55w0rd'
  } = {}) {
    this.id = id;
    this.name = name;
    this.login = login;
    this.password = password;
  }

  public toString(): string {
    return `${this.name} (${this.login})`;
  }
}


