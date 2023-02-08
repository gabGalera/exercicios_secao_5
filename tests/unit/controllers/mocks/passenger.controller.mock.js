const passengerMock = {
  name: 'Bruce Lane',
  email: 'bruce.lane@acme.com',
  phone: '(77) 8179-0943',
};

const newPassengerMock = { id: 1, ...passengerMock };

const passengerListMock = [newPassengerMock];

const happyReqCreateTravelObject = {
  params: {
    passengerId: 42,
  },
  body: {
    startingAddress: 'Rua X',
    endingAddress: 'Rua Y',
    waypoints: [
      {
        address: 'Ponto 01',
        stopOrder: '1',
      },
      {
        address: 'Ponto 02',
        stopOrder: '2',
      },
    ],
  },
};

const happyResponseCreateTravelObject = {
  id: 3,
  passengerId: 3,
  driverId: null,
  travelStatusId: 1,
  startingAddress: 'Rua X',
  endingAddress: 'Rua Y',
  requestDate: '2022-08-28T21:10:35.000Z',
};

const happyControllerResponseCreateTravelObject = {
  type: null,
  message: happyResponseCreateTravelObject
};

module.exports = {
  passengerMock,
  newPassengerMock,
  passengerListMock,
  happyReqCreateTravelObject,
  happyControllerResponseCreateTravelObject,
  happyResponseCreateTravelObject,
};