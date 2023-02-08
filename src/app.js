const express = require('express');
const connection = require('./models/connection');

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
  await connection.execute(
    'UPDATE travels SET driver_id = ? WHERE id = ?',
    [driverId, travelId],
  );
  await connection.execute(
    'UPDATE travels SET travel_status_id = ? WHERE id = ? AND driver_id = ?',
    [DRIVER_ON_THE_WAY, travelId, driverId],
  );
  const [[result]] = await connection.execute(
    'SELECT * FROM travels WHERE id = ?',
    [travelId],
  );
  res.status(200).json(result);
});

app.put('/drivers/:driverId/travels/:travelId/start', async (req, res) => {
  const { travelId, driverId } = req.params;
  await connection.execute(
    'UPDATE travels SET travel_status_id = ? WHERE id = ? AND driver_id = ?',
    [TRAVEL_IN_PROGRESS, travelId, driverId],
  );
  const [[result]] = await connection.execute(
    'SELECT * FROM travels WHERE id = ?',
    [travelId],
  );
  res.status(200).json(result);
});

app.put('/drivers/:driverId/travels/:travelId/end', async (req, res) => {
  const { travelId, driverId } = req.params;
  await connection.execute(
    'UPDATE travels SET travel_status_id = ? WHERE id = ? AND driver_id = ?',
    [TRAVEL_FINISHED, travelId, driverId],
  );
  const [[result]] = await connection.execute(
    'SELECT * FROM travels WHERE id = ?',
    [travelId],
  );
  res.status(200).json(result);
});

module.exports = app;
