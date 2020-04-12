import userRepository from './user.memory.repository';
import { IUser, IUserBody, IUserDomain } from './user.interface';
import { User } from './user.model';
import taskRepository from '../tasks/task.memory.repository';

export class UserService {
  private static instance: UserService;

  constructor(
  ) {
    if(!UserService.instance){
      UserService.instance = this;
    }

    return UserService.instance;
  }

  public find(): Promise<IUserDomain[]> {
    console.info('Find all users');
    return userRepository.find();
  }

  public findById(id: string): Promise<IUserDomain | undefined> {
    console.info('Find one user');
    return userRepository.findById(id);
  }

  public create(body: IUserBody): Promise<IUserDomain> {
    const user = new User({name: body.name, login: body.login, password: body.password});
    console.info('Create a new user => ', user.toString());
    return userRepository.save(user);
  }

  public update(id: string, body: IUserBody): Promise<IUserDomain> {
    const user = new User({id, name: body.name, login: body.login, password: body.password});
    console.info('Update a user');
    return userRepository.updateById(id, user);
  }

  public async delete(id: string): Promise<IUserDomain | undefined> {
    console.info('Delete a user');
    const tasks = await taskRepository.find();
    tasks.map(async task => {
      if (task.userId === id) {
        task.userId = null;
        await taskRepository.updateById(task.id, task.boardId, task);
      }
    });
    return userRepository.deleteById(id);
  }
}

const instance = new UserService();
Object.freeze(instance);

export default instance;
