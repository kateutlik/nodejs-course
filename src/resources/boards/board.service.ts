import boardRepository from './board.memory.repository';
import taskRepository from '../tasks/task.memory.repository';
import { IBoard, IBoardBody } from './board.interface';
import { Board } from './board.model';

// TODO Add Event Dispatcher
// TODO Replace console.info with Logger

export class BoardService {
  private static instance: BoardService;

  constructor(
  ) {
    if(!BoardService.instance){
      BoardService.instance = this;
    }

    return BoardService.instance;
  }

  public find(): Promise<IBoard[]> {
    console.info('Find all boards');
    return boardRepository.find();
  }

  public findById(id: string): Promise<IBoard | undefined> {
    console.info('Find one board');
    return boardRepository.findById(id);
  }

  public create(body: IBoardBody): Promise<IBoard> {
    // @ts-ignore
    const board = new Board({title: body.title, columns: body.columns});
    console.info('Create a new board => ', board.toString());
    return boardRepository.save(board);
  }

  public update(id: string, body: IBoardBody): Promise<IBoard> {
    // @ts-ignore
    const board = new Board({id, title: body.title, columns: body.columns});
    console.info('Update a board');
    return boardRepository.updateById(id, board);
  }

  public async delete(id: string): Promise<IBoard | undefined> {
    console.info('Delete a board');
    const tasks = await taskRepository.find();
    tasks.map(async task => {
      if (task.boardId === id) {
        await taskRepository.deleteById(task.id, id);
      }
    });
    return boardRepository.deleteById(id);
  }
}

const instance = new BoardService();
Object.freeze(instance);

export default instance;
