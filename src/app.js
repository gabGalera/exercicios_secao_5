const express = require('express');

const { driverService, travelService } = require('./services');
const { passengerRouter } = require('./routers');

const app = express();

app.use(express.json());

app.use('/passengers', passengerRouter);

app.get('/drivers/open/travels', async (_req, res) => {
  const result = await driverService.getWaitingDriverTravels();
  res.status(200).json(result);
});

app.put('/drivers/:driverId/travels/:travelId/assign', async (req, res) => {
  const { travelId, driverId } = req.params;
  const { type, message } = await travelService.travelAssign({ travelId, driverId });
  if (type) return res.status(type).json(message);

  res.status(200).json(message);
});

app.put('/drivers/:driverId/travels/:travelId/start', async (req, res) => {
  const { travelId, driverId } = req.params;
  const { type, message } = await travelService.startTravel({ travelId, driverId });
  if (type) return res.status(type).json(message);

  res.status(200).json(message);
});

app.put('/drivers/:driverId/travels/:travelId/end', async (req, res) => {
  const { travelId, driverId } = req.params;
  const { type, message } = await travelService.endTravel({ travelId, driverId });
  if (type) return res.status(type).json(message);

  res.status(200).json(message);
});

module.exports = app;
