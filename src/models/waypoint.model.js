const snakeize = require('snakeize');
const connection = require('./connection');

const insert = async (entry) => {
  const columns = Object.keys(snakeize(entry)).join(', ');

  const placeholders = Object.keys(entry)
    .map((_key) => '?')
    .join(', ');

  const [{ insertId }] = await connection.execute(
    `INSERT INTO waypoints (${columns}) VALUE (${placeholders})`,
    [...Object.values(entry)],
  );

  return insertId;
};

module.exports = {
  insert,
};