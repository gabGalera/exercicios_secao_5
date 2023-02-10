const express = require('express');
const { travelService } = require('../services');
const { driverController } = require('../controllers');

const router = express.Router();

router.get('/open/travels', driverController.openTravel);

router.put('/:driverId/travels/:travelId/assign', async (req, res) => {
  const { travelId, driverId } = req.params;
  const { type, message } = await travelService.travelAssign({ travelId, driverId });
  if (type) return res.status(type).json(message);

  res.status(200).json(message);
});

router.put('/:driverId/travels/:travelId/start', async (req, res) => {
  const { travelId, driverId } = req.params;
  const { type, message } = await travelService.startTravel({ travelId, driverId });
  if (type) return res.status(type).json(message);

  res.status(200).json(message);
});

router.put('/:driverId/travels/:travelId/end', async (req, res) => {
  const { travelId, driverId } = req.params;
  const { type, message } = await travelService.endTravel({ travelId, driverId });
  if (type) return res.status(type).json(message);

  res.status(200).json(message);
});

module.exports = router;