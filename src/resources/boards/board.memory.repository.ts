import { IBoard } from './board.interface';
import { BoardDataMapper } from './board.data.mapper';

let boards: IBoard[] = [
  {
    id: '1',
    title: 'title 1',
    columns: [{
      id: '1',
      title: 'column 1',
      order: 0,
    }]
  },
  {
    id: '2',
    title: 'title 2',
    columns: [{
      id: '2',
      title: 'column 2',
      order: 0,
    }]
  },
];

export class BoardRepository {
  private getLastIndex = () => boards.length - 1;
  private getLastItem = () => boards[this.getLastIndex()];
  private getIndexById = (id: string) => boards.findIndex(this.isEqualById.bind(null, id));
  private isEqualById = (id: string, item: IBoard) => item.id === id;
  private isNotEqualById = (id: string, item: IBoard) => item.id !== id;
  private setData = (data: IBoard[]) => {
    boards = data;
  }

  private getUpdatedBoards(item: IBoard): IBoard[] {
    return boards.map(board =>
      this.isEqualById(item.id, board) ? { ...board, ...item } : board
    );
  };

  public async find(): Promise<IBoard[]> {
    return boards.map((board) => BoardDataMapper.toDomain(board));;
  }
  public async findById(id: string): Promise<IBoard | undefined> {
    const board = boards.find(this.isEqualById.bind(null, id));
    return board ? BoardDataMapper.toDomain(board) : undefined;
  }

  public async save(item: IBoard): Promise<IBoard> {
    this.setData([...boards, item]);
    return BoardDataMapper.toDomain(this.getLastItem());
  };

  public async updateById(id: string, item: IBoard): Promise<IBoard> {
    const index = this.getIndexById(id);
    this.setData(this.getUpdatedBoards(item));
    return BoardDataMapper.toDomain(boards[index]);
  };

  public async deleteById(id: string): Promise<IBoard | undefined> {
    const index = this.getIndexById(id);
    const board = index > -1 ? BoardDataMapper.toDomain(boards.slice(index, index + 1)[0]) : undefined;
    this.setData(boards.filter(this.isNotEqualById.bind(null, id)));
    return board;
  };
}

const instance = new BoardRepository();
Object.freeze(instance);

export default instance;
