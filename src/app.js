const express = require('express');
const { travelModel } = require('./models');

const { driverService } = require('./services');
const { passengerRouter } = require('./routers');

const app = express();

app.use(express.json());

app.use('/passengers', passengerRouter);

const DRIVER_ON_THE_WAY = 2;
const TRAVEL_IN_PROGRESS = 3;
const TRAVEL_FINISHED = 4;

app.get('/drivers/open/travels', async (_req, res) => {
  const result = await driverService.getWaitingDriverTravels();
  res.status(200).json(result);
});

app.put('/drivers/:driverId/travels/:travelId/assign', async (req, res) => {
  const { travelId, driverId } = req.params;
  await travelModel.updateById(travelId, { driverId, travelStatusId: DRIVER_ON_THE_WAY });
  
  const travel = await travelModel.findById(travelId); 
  res.status(200).json(travel);
});

app.put('/drivers/:driverId/travels/:travelId/start', async (req, res) => {
  const { travelId, driverId } = req.params;
  
  await travelModel.updateById(travelId, { driverId, travelStatusId: TRAVEL_IN_PROGRESS });

  const travel = await travelModel.findById(travelId);
  res.status(200).json(travel);
});

app.put('/drivers/:driverId/travels/:travelId/end', async (req, res) => {
  const { travelId, driverId } = req.params;
  await travelModel.updateById(travelId, { driverId, travelStatusId: TRAVEL_FINISHED });

  const travel = await travelModel.findById(travelId);
  res.status(200).json(travel);
});

module.exports = app;
