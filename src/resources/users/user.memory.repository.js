let users = [
  {
    id: '1',
    name: 'Anna',
    login: 'anna',
    password: 'p@ssword'
  },
  {
    id: '2',
    name: 'Bella',
    login: 'bella',
    password: 'p@ssword'
  }
];

const getLastIndex = () => users.length - 1;
const getLastItem = () => users[getLastIndex()];
const getIndexById = id => users.findIndex(checkId.bind(this, id));
const checkId = (id, item) => item.id === id;
const setUsers = data => (users = data);

const getUpdatedUsers = item => {
  return users.map(user =>
    checkId(item.id, user) ? { ...user, ...item } : user
  );
};

const list = async () => users;
const getById = async id => users.find(checkId.bind(this, id));

const create = async item => {
  setUsers([...users, item]);
  return getLastItem();
};

const updateById = async (id, item) => {
  const index = getIndexById(id);
  setUsers(getUpdatedUsers(item));
  return users[index];
};

const deleteById = async id => {
  const index = getIndexById(id);
  return index > -1 ? users.slice(index, 1) : [];
};

module.exports = { list, getById, create, updateById, deleteById };
