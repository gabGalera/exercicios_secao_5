const { travelService, driverService } = require('../services');
const errorMap = require('../utils/errorMap');

const openTravel = async (_req, res) => {
  const { type, message } = await travelService.getWaitingDriverTravels();

  if (type) return res.status(errorMap.mapError(type)).json(message);

  res.status(200).json(message);
};

const travelAssign = async (req, res) => {
    const { travelId, driverId } = req.params;
    const { type, message } = await travelService.travelAssign({ travelId, driverId });
    if (type) return res.status(errorMap.mapError(type)).json(message);
  
    res.status(200).json(message);
  };

const startTravel = async (req, res) => {
  const { travelId, driverId } = req.params;
  const { type, message } = await travelService.startTravel({ travelId, driverId });
  if (type) return res.status(errorMap.mapError(type)).json(message);

  res.status(200).json(message);
};

const endTravel = async (req, res) => {
  const { travelId, driverId } = req.params;
  const { type, message } = await travelService.endTravel({ travelId, driverId });
  if (type) return res.status(errorMap.mapError(type)).json(message);

  res.status(200).json(message);
};

const getDrivers = async (_req, res) => {
  const { type, message } = await driverService.getDrivers();
  if (type) return res.status(errorMap.mapError(type)).json(message);

  res.status(200).json(message);
};

module.exports = {
  openTravel,
  travelAssign,
  startTravel,
  endTravel,
  getDrivers,
};