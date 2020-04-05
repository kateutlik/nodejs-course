export interface IUserBody {
  name: string,
  login: string,
  password: string
}
export interface IUser extends IUserBody {
  id: string
}
export interface IUserDomain {
  id: string,
  name: string,
  login: string,
}