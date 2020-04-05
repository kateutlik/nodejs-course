export interface ITaskBody {
  title: string
  order: number
  description: string
  userId: null | string
  boardId: string
  columnId: null | string
}
export interface ITask extends ITaskBody {
  id: string
}