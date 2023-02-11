const { driverModel, carModel, driverCarModel } = require('../models');
const { validateNewDriver } = require('./validations/validationsInputValues');

const getDrivers = async () => {
  const drivers = await driverModel.findAll();
  if (!drivers) return { type: 'DRIVER_NOT_FOUND', message: drivers };
  return { type: null, message: drivers };
};

const createDriver = async (name, carsIds) => {
  const error = await validateNewDriver(name, carsIds);
  if (error.type) return error;

  const newDriverId = await driverModel.insert(name);
  const newDriver = await driverModel.findById(newDriverId);
  // const allCars = await carModel
  if (carsIds && carsIds.length > 0) {
    await Promise.all(
      carsIds.map(async (carId) => driverCarModel.insert({ 
        driverId: newDriver.id, 
        carId, 
      })),
    );
    newDriver.cars = await Promise.all(
      carsIds.map(async (carId) => carModel.findById(carId)),
    );
  } else {
    newDriver.cars = [];
  }

  return { type: null, message: newDriver };
};

module.exports = {
  getDrivers,
  createDriver,
};