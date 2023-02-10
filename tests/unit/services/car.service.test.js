const { expect } = require('chai');
const sinon = require('sinon');
const { carService } = require('../../../src/services');
const { newCarMock } = require('./mocks/car.service.mock');
const { carModel } = require('../../../src/models');

const { model, color, licensePlate, id } = newCarMock.message;

describe('listagem de carros', function () {
  it('Cria um novo carro com modelo inválido', async function () {
    // Arrange
    sinon.stub(carModel, 'insert').resolves(id);
    sinon.stub(carModel, 'findById').resolves(newCarMock.message);

    // Act
    const result = await carService.createCar({ model: 'D', color, licensePlate });

    // Assert
    expect(result.message).to.be.equal('"model" length must be at least 3 characters long');
    expect(result.type).to.be.equal('INVALID_VALUE');
  });

  it('Cria um novo carro com color inválido', async function () {
    // Arrange
    sinon.stub(carModel, 'insert').resolves(id);
    sinon.stub(carModel, 'findById').resolves(newCarMock.message);

    // Act
    const result = await carService.createCar({ model, color: 'D', licensePlate });

    // Assert
    expect(result.message).to.be.equal('"color" length must be at least 2 characters long');
    expect(result.type).to.be.equal('INVALID_VALUE');
  });

  it('Cria um novo carro com licensePlate inválido', async function () {
    // Arrange
    sinon.stub(carModel, 'insert').resolves(id);
    sinon.stub(carModel, 'findById').resolves(newCarMock.message);

    // Act
    const result = await carService.createCar({ model, color, licensePlate: 'D' });

    // Assert
    expect(result.message).to.be.equal('"licensePlate" length must be at least 7 characters long');
    expect(result.type).to.be.equal('INVALID_VALUE');
  });

  it('Cria um novo carro com sucesso', async function () {
    // Arrange
    sinon.stub(carModel, 'insert').resolves(id);
    sinon.stub(carModel, 'findById').resolves(newCarMock.message);

    // Act
    const result = await carService.createCar({ model, color, licensePlate });

    // Assert
    expect(result.message).to.be.deep.equal(newCarMock.message);
  });

  afterEach(function () {
    sinon.restore();
  });
});