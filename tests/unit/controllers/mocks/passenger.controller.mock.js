const passengerMock = {
  name: 'Bruce Lane',
  email: 'bruce.lane@acme.com',
  phone: '(77) 8179-0943',
};

const newPassengerMock = { id: 1, ...passengerMock };

const passengerListMock = [newPassengerMock];

module.exports = {
  passengerMock,
  newPassengerMock,
  passengerListMock,
};