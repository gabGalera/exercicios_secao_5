const { passengerService } = require('../services');
const errorMap = require('../utils/errorMap');

const listPassengers = async (_req, res) => {
  const { type, message } = await passengerService.findAll();

  if (type) return res.status(errorMap.mapError(type)).json(message);

  res.status(200).json(message);
};

const getPassenger = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await passengerService.findById(id);

  if (type) return res.status(errorMap.mapError(type)).json(message);

  res.status(200).json(message);
};

module.exports = {
  getPassenger,
  listPassengers,
};