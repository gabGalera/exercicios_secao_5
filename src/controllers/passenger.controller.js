const { passengerService } = require('../services');

const listPassengers = async (_req, res) => {
  const { type, message } = await passengerService.findAll();

  if (type) return res.status(500).json(message);

  res.status(200).json(message);
};

module.exports = {
  listPassengers,
};