const { expect } = require('chai');
const sinon = require('sinon');
const { driverService } = require('../../../src/services');
const { driverModel } = require('../../../src/models');
const { allDrivers } = require('./mocks/driver.service.mock');

describe('Verificando service motoristas', function () {
  describe('listagem dos motoristas', function () {
    it('Busca todos os motoristas', async function () {
      // Arrange
      sinon.stub(driverModel, 'findAll').resolves(allDrivers.message);

      // Act
      const result = await driverService.getDrivers();

      // Assert
      expect(result.type).to.be.equal(allDrivers.type);
      expect(result.message).to.be.deep.equal(allDrivers.message);
    });
  });
});