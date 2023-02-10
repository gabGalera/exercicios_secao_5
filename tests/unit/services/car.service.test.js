const { expect } = require('chai');
const sinon = require('sinon');
const { carService } = require('../../../src/services');
const { newCarMock } = require('./mocks/car.service.mock');
const { carModel } = require('../../../src/models');

const { model, color, licensePlate, id } = newCarMock.message;

describe('listagem de carros', function () {
  it('Cria um novo carro', async function () {
    // Arrange
    sinon.stub(carModel, 'insert').resolves(id);
    sinon.stub(carModel, 'findById').resolves(newCarMock.message);

    // Act
    const result = await carService.createCar({ model, color, licensePlate });

    // Assert
    expect(result.message).to.be.deep.equal(newCarMock.message);
  });
});