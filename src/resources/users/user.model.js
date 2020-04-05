const uuid = require('uuid');
const UserRepo = require('./user.memory.repository');

class User {
  constructor({
    id = uuid(),
    name = 'USER',
    login = 'user',
    password = 'P@55w0rd'
  } = {}) {
    this.id = id;
    this.name = name;
    this.login = login;
    this.password = password;
  }

  static toResponse(user) {
    const { id, name, login } = user;
    return { id, name, login };
  }
}

exports.list = async () => {
  return (await UserRepo.list()).map(User.toResponse);
};

exports.getById = async id => {
  return User.toResponse(await UserRepo.getById(id));
};

exports.create = async userData => {
  const user = new User({ ...userData });
  return User.toResponse(await UserRepo.create(user));
};

exports.putById = async (id, userData) => {
  const user = new User({ id, ...userData });
  return User.toResponse(await UserRepo.updateById(id, user));
};

exports.deleteById = async id => {
  return (await UserRepo.deleteById(id)).map(User.toResponse);
};
