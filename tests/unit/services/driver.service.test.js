const { expect } = require('chai');
const sinon = require('sinon');
const { driverService } = require('../../../src/services');
const { driverModel, carModel } = require('../../../src/models');
const { allDrivers, newDriver, carsList } = require('./mocks/driver.service.mock');

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

    it('Testa a função createDriver com sucesso', async function () {
      // Arrange
      sinon.stub(driverModel, 'insert').resolves(1);
      sinon.stub(driverModel, 'findById').resolves({ id: 1, name: 'Gus' });

      sinon.stub(carModel, 'findById')
        .onCall(0)
          .resolves(carsList[0])
        .onCall(1)
          .resolves(carsList[1])
        .onCall(2)
          .resolves(carsList[0])
        .onCall(3)
          .resolves(carsList[1]);
      
      // Act
      const result = await driverService.createDriver('Gus', [1, 2]);
      
      // Assert
      expect(result.message).to.be.deep.equal(newDriver.message);
    });
    afterEach(function () {
      sinon.restore();
    });
  });
});