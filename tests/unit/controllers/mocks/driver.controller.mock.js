const WAITING_DRIVER = 1;
const DRIVER_ON_THE_WAY = 2;
const TRAVEL_IN_PROGRESS = 3;
const TRAVEL_FINISHED = 4;

const correctReturnTravel = ({
  id: 1,
  passengerId: 1,
  driverId: null,
  travelStatusId: DRIVER_ON_THE_WAY,
  startingAddress: 'Start',
  endingAddress: 'End',
  requestDate: '2022-08-24T03:04:04.374Z',
});

const allDrivers = [
  {
    "id": 1,
    "name": "Liana Cisneiros"
  },
  {
    "id": 2,
    "name": "Fábio Frazão"
  },
  {
    "id": 3,
    "name": "Anastacia Bicalho"
  },
  {
    "id": 4,
    "name": "Samara Granjeiro"
  },
  {
    "id": 5,
    "name": "Levi Teixeira"
  },
  {
    "id": 6,
    "name": "Gus"
  }
];

module.exports = {
  correctReturnTravel,
  allDrivers,
};