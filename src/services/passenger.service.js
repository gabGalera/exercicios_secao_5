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

const createPassenger = async (name, email, phone) => {
  const error = schema.validateNewPassenger(name, email, phone);
  if (error.type) return error;

  const newPassengerId = await passengerModel.insert({ name, email, phone });
  const newPassenger = await passengerModel.findById(newPassengerId);

  return { type: null, message: newPassenger };
};

module.exports = {
  findAll,
  findById,
  createPassenger,
};