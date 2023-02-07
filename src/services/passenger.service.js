const { passengerModel } = require('../models');

const findAll = async () => {
  const passengers = await passengerModel.findAll();
  return { type: null, message: passengers };
};

module.exports = {
  findAll,
};