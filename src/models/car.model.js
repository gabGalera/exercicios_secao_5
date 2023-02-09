const snakeize = require('snakeize');
const connection = require('./connection');

const findById = async (id) => {
  const result = connection.execute(
    'SELECT * FROM cars WHERE id = ?',
    [id],
  );

  return result;
};

const insert = async (car) => {
  const columns = Object.keys(snakeize(car)).join(', ');

  const placeholders = Object.keys(car)
    .map((_key) => '?')
    .join(', ');

  const [{ insertId }] = await connection.execute(
    `INSERT INTO cars (${columns}) VALUE (${placeholders})`,
    [...Object.values(car)],
  );

  return insertId;
};

module.exports = {
  insert,
  findById,
};