const data = [
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

const getAll = async () => {
  return data;
};

const create = async item => {
  data.push(item);
  return item;
};

const getById = async id => {
  return data.find(user => user.id === id);
};

const updateById = async (id, item) => {
  const index = data.findIndex(user => user.id === id);
  data[index] = { ...data[index], ...item };
  return data[index];
};

const deleteById = async id => {
  const index = data.findIndex(user => user.id === id);
  return index > -1 ? data.splice(index, 1) : {};
};

module.exports = { getAll, getById, create, updateById, deleteById };
