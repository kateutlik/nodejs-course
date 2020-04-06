import { ITask } from './task.interface';
import { TaskDataMapper } from './task.data.mapper';
let tasks: ITask[] = [];

export class TaskRepository {
  private getLastIndex = () => tasks.length - 1;
  private getLastItem = () => tasks[this.getLastIndex()];
  private getIndexById = (id: string, boardId: string) => tasks.findIndex(this.isEqualById.bind(null, id, boardId));
  private isEqualById = (id: string, boardId: string, item: ITask) => item.id === id && item.boardId === boardId;
  private isEqualByBoardId = (boardId: string, item: ITask) => item.boardId === boardId;
  private isNotEqualById = (id: string, boardId: string, item: ITask) => item.id !== id && item.boardId === item.boardId;
  private setData = (data: ITask[]) => {
    tasks = data;
  }

  private getUpdatedTasks(item: ITask): ITask[] {
    return tasks.map(task =>
      this.isEqualById(item.id, item.boardId, task) ? { ...task, ...item } : task
    );
  };

  public async find(): Promise<ITask[]> {
    return tasks.map((task) => TaskDataMapper.toDomain(task));
  }

  public async findByBoardId(boardId: string): Promise<ITask[]> {
    return tasks
      .filter(this.isEqualByBoardId.bind(null, boardId))
      .map((task) => TaskDataMapper.toDomain(task));
  }

  public async findById(id: string, boardId: string): Promise<ITask | undefined> {
    const task = tasks.find(this.isEqualById.bind(null, id, boardId));
    return task ? TaskDataMapper.toDomain(task) : undefined;
  }

  public async save(item: ITask): Promise<ITask> {
    this.setData([...tasks, item]);
    return TaskDataMapper.toDomain(this.getLastItem());
  };

  public async updateById(id: string, boardId: string, item: ITask): Promise<ITask> {
    const index = this.getIndexById(id, boardId);
    this.setData(this.getUpdatedTasks(item));
    return TaskDataMapper.toDomain(tasks[index]);
  };

  public async deleteById(id: string, boardId: string): Promise<ITask | undefined> {
    const index = this.getIndexById(id, boardId);
    const task = index > -1 ? TaskDataMapper.toDomain(tasks.slice(index, index + 1)[0]) : undefined;
    this.setData(tasks.filter(this.isNotEqualById.bind(null, id, boardId)));
    return task;
  };
}

const instance = new TaskRepository();
Object.freeze(instance);

export default instance;
