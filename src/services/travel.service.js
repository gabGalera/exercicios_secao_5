const { travelModel } = require('../models');
const { 
  validateInputValues, 
  validateAlreadyDriver, 
} = require('./validations/validationsInputValues');

const WAITING_DRIVER = 1;
const DRIVER_ON_THE_WAY = 2;
const TRAVEL_IN_PROGRESS = 3;
const TRAVEL_FINISHED = 4;

const getWaitingDriverTravels = async () => {
  const travels = await travelModel.findByTravelStatusId(WAITING_DRIVER);
  return { type: null, message: travels }; 
};

const travelAssign = async ({ travelId, driverId }) => {
  let error = await validateInputValues({ travelId, driverId });
  if (error.type) return error;

  error = await validateAlreadyDriver(travelId);
  if (error.type) return error;

  await travelModel.updateById(travelId, 
    { 
      driverId, travelStatusId: DRIVER_ON_THE_WAY, 
    });
    
  const result = await travelModel.findById(travelId);
  return { type: null, message: result };
};

const startTravel = async ({ travelId, driverId }) => {
  let error = await validateInputValues({ travelId, driverId });
  if (error.type) return error;

  error = await validateAlreadyDriver(travelId);
  if (error.type) return error;

  await travelModel.updateById(travelId, 
    { 
      driverId, travelStatusId: TRAVEL_IN_PROGRESS, 
    });
    
  const result = await travelModel.findById(travelId);
  return { type: null, message: result };
};

const endTravel = async ({ travelId, driverId }) => {
  let error = await validateInputValues({ travelId, driverId });
  if (error.type) return error;

  error = await validateAlreadyDriver(travelId);
  if (error.type) return error;

  await travelModel.updateById(travelId, 
    { 
      driverId, travelStatusId: TRAVEL_FINISHED, 
    });
    
  const result = await travelModel.findById(travelId);
  return { type: null, message: result };
};

module.exports = {
  getWaitingDriverTravels,
  travelAssign,
  startTravel,
  endTravel,
};