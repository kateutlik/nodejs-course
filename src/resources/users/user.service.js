const usersRepo = require('./user.memory.repository');

const getAll = () => usersRepo.getAll();
const getUserById = id => usersRepo.getById(id);
const createUser = user => usersRepo.create(user);
const updateUser = (id, user) => usersRepo.updateById(id, user);
const deleteById = id => usersRepo.deleteById(id);

module.exports = { getAll, getUserById, createUser, updateUser, deleteById };
