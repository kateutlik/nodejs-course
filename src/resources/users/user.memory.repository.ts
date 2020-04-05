import { IUser, IUserDomain } from './user.interface';
import { UserDataMapper } from './user.data.mapper';
let users: IUser[] = [
  {
    id: '1',
    name: 'Anna',
    login: 'anna',
    password: 'p@ssword'
  },
  {
    id: '2',
    name: 'Bella',
    login: 'bella',
    password: 'p@ssword'
  }
];

export class UserRepository {
  private getLastIndex = () => users.length - 1;
  private getLastItem = () => users[this.getLastIndex()];
  private getIndexById = (id: string) => users.findIndex(this.isEqualById.bind(null, id));
  private isEqualById = (id: string, item: IUser) => item.id === id;
  private isNotEqualById = (id: string, item: IUser) => item.id !== id;
  private setData = (data: IUser[]) => {
    users = data;
  }

  private getUpdatedUsers(item: IUser): IUser[] {
    return users.map(user =>
      this.isEqualById(item.id, user) ? { ...user, ...item } : user
    );
  };

  public async find(): Promise<IUserDomain[]> {
    return users.map((user) => UserDataMapper.toDomain(user));;
  }
  public async findById(id: string): Promise<IUserDomain | undefined> {
    const user = users.find(this.isEqualById.bind(null, id));
    return user ? UserDataMapper.toDomain(user) : undefined;
  }

  public async save(item: IUser): Promise<IUserDomain> {
    this.setData([...users, item]);
    return UserDataMapper.toDomain(this.getLastItem());
  };

  public async updateById(id: string, item: IUser): Promise<IUserDomain> {
    const index = this.getIndexById(id);
    this.setData(this.getUpdatedUsers(item));
    return UserDataMapper.toDomain(users[index]);
  };

  public async deleteById(id: string): Promise<IUserDomain | undefined> {
    const index = this.getIndexById(id);
    const user = index > -1 ? UserDataMapper.toDomain(users.slice(index, index + 1)[0]) : undefined;
    this.setData(users.filter(this.isNotEqualById.bind(null, id)));
    return user;
  };
}

const instance = new UserRepository();
Object.freeze(instance);

export default instance;
