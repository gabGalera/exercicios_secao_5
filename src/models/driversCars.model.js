const snakeize = require('snakeize');
const connection = require('./connection');

const insert = async (driverCar) => {
  const columns = Object.keys(snakeize(driverCar)).join(', ');

  const placeholders = Object.keys(driverCar)
    .map((_key) => '?')
    .join(', ');

  const [{ insertId }] = await connection.execute(
    `INSERT INTO drivers_cars (${columns}) VALUE (${placeholders})`,
    [...Object.values(driverCar)],
  );

  return insertId;
};

module.exports = {
  insert,
};