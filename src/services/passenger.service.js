const { passengerModel } = require('../models');
const schema = require('./validations/validationsInputValues');

const findAll = async () => {
  const passengers = await passengerModel.findAll();
  return { type: null, message: passengers };
};

const findById = async (passengerId) => {
  const error = schema.validateId(passengerId);
  if (error.type) return error;

  const passenger = await passengerModel.findById(passengerId);
  if (!passenger) return { type: 'PASSENGER_NOT_FOUND', message: 'Passenger not found' };

  return { type: null, message: passenger };
};

module.exports = {
  findAll,
  findById,
};