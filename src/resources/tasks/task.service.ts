import taskRepository from './task.memory.repository';
import { ITask, ITaskBody } from './task.interface';
import { Task } from './task.model';

export class TaskService {
  private static instance: TaskService;

  constructor(
  ) {
    if(!TaskService.instance){
      TaskService.instance = this;
    }

    return TaskService.instance;
  }

  public findByBoardId(boardId: string): Promise<ITask[]> {
    console.info('Find all tasks');
    return taskRepository.findByBoardId(boardId);
  }

  public findById(id: string, boardId: string): Promise<ITask | undefined> {
    console.info('Find one task');
    return taskRepository.findById(id, boardId);
  }

  public create(boardId: string, body: ITaskBody): Promise<ITask> {
    const task = new Task({
      boardId: boardId,
      userId: body.userId!,
      title: body.title,
      order: body.order,
      description: body.description
    });
    console.info('Create a new task => ', task.toString());
    return taskRepository.save(task);
  }

  public update(id: string, boardId: string, body: ITaskBody): Promise<ITask> {
    const task = new Task({
      id,
      boardId,
      userId: body.userId!,
      title: body.title,
      order: body.order,
      description: body.description
    });
    console.info('Update a task');
    return taskRepository.updateById(id, boardId, task);
  }

  public delete(id: string, boardId: string): Promise<ITask | undefined> {
    console.info('Delete a task');
    return taskRepository.deleteById(id, boardId);
  }
}

const instance = new TaskService();
Object.freeze(instance);

export default instance;
