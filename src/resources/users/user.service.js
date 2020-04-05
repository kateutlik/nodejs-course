const UserModel = require('./user.model');
const httpStatus = require('http-status');
const MESSAGES = require('../../constants/error-messages');

const getAll = async (req, res) => {
  try {
    const users = await UserModel.list();
    res.status(httpStatus.OK).json(users);
  } catch (e) {
    res.status(httpStatus.NOT_FOUND).json(MESSAGES.USERS_NOT_FOUND);
  }
};

const getById = async (req, res) => {
  try {
    const user = await UserModel.getById(req.params.id);
    res.status(httpStatus.OK).json(user);
  } catch (e) {
    res.status(httpStatus.NOT_FOUND).json(MESSAGES.USER_NOT_FOUND);
  }
};
const create = async (req, res) => {
  try {
    const user = await UserModel.create(req.body);
    res.status(httpStatus.CREATED).json(user);
  } catch (e) {
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json(MESSAGES.USER_NOT_CREATED);
  }
};
const putById = async (req, res) => {
  try {
    const user = await UserModel.putById(req.params.id, req.body);
    res.status(httpStatus.OK).json(user);
  } catch (e) {
    res.status(httpStatus.NOT_FOUND).json(MESSAGES.USER_NOT_FOUND);
  }
};
const deleteById = async (req, res) => {
  try {
    const user = await UserModel.deleteById(req.params.id);
    res.status(httpStatus.OK).json(user);
  } catch (e) {
    res.status(httpStatus.NO_CONTENT).json(MESSAGES.USER_NOT_FOUND);
  }
};

module.exports = { getAll, getById, create, putById, deleteById };
