const { carModel } = require('../models');
const schema = require('./validations/validationsInputValues');

const createCar = async ({ model, color, licensePlate }) => {
  const error = schema.validateNewCar(model, color, licensePlate);
  if (error.type) return error;

  const newCarId = await carModel.insert({ model, color, licensePlate });
  const newCar = await carModel.findById(newCarId);

  return { type: null, message: newCar };
};

module.exports = {
  createCar,
};