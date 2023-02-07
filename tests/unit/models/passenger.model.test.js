// tests/unit/models/passenger.model.test.js
const { expect } = require('chai');
const sinon = require('sinon');
const { passengerModel } = require('../../../src/models');

const connection = require('../../../src/models/connection');
const { passengers } = require('./mocks/passenger.model.mock');

describe('Testes de unidade do model de pessoas passageiras', function () {
  it('Recuperando a lista de pessoas passageiras', async function () {
    // Arrange
    sinon.stub(connection, 'execute').resolves([passengers]);
    // Act
    const result = await passengerModel.findAll();
    // Assert
    expect(result).to.be.deep.equal(passengers);
  });

  afterEach(function () {
    sinon.restore();
  });
  
  it('Recuperando uma pessoa passageira a partir do seu id', async function () {
    // Arrange
    sinon.stub(connection, 'execute').resolves([[passengers[0]]]);
    // Act
    const result = await passengerModel.findById(1);
    // Assert
    expect(result).to.be.deep.equal(passengers[0]);
  });
});