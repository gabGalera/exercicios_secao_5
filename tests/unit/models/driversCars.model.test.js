const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');

const { payload } = require('./mocks/driversCars.model.mock');

const { driversCarsModel } = require('../../../src/models');

describe('Testa o model driversCars', function () {
  it('Testa se retorna o id correto', async function () {
    // Arrange
    sinon.stub(connection, 'execute').resolves([{ insertId: 1 }]);

    // Act
    const result = await driversCarsModel.insert(payload);

    // Assert
    expect(result).to.equal(1);
  });

  afterEach(function () {
    sinon.restore();
  });
});