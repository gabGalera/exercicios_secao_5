const { expect } = require('chai');
const sinon = require('sinon');

const { driverModel } = require('../../../src/models');

const connection = require('../../../src/models/connection');
const { driversMock, driverIdMock } = require('./mocks/drivers.model.mock');

describe('Testes sobre driverModel', function () {
  it('Testa a função findAll', async function () {
    // Arrange
    sinon.stub(connection, 'execute').resolves([driversMock]);

    // Act
    const result = await driverModel.findAll();

    // Assert
    expect(result).to.be.a('array');
    expect(result).to.be.deep.equal(result);
  });

  it('Teste a função findById', async function () {
    // Arrange
    sinon.stub(connection, 'execute').resolves([[driversMock[0]]]);

    // Act
    const result = await driverModel.findById(1);

    // Assertion
    expect(result.id).to.be.deep.equal(driverIdMock);
  });
  
  afterEach(function () {
    sinon.restore();
  });
});