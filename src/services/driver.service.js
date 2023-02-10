const { driverModel } = require('../models');

const getDrivers = async () => {
  const drivers = await driverModel.findAll();
  return { type: null, message: drivers };
};

module.exports = {
  getDrivers,
};