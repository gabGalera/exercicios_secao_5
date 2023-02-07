const { expect } = require('chai');
const sinon = require('sinon');
const { passengerService } = require('../../../src/services');
const { passengerModel } = require('../../../src/models');

const { allPassengers } = require('./mocks/passenger.service.mock');

describe('Verificando service pessoa passageira', function () {
  describe('listagem de pessoas passageiras', function () {
    it('retorna a lista completa de pessoas passageiras', async function () {
      // arrange
      sinon.stub(passengerModel, 'findAll').resolves(allPassengers);
      
      // act
      const result = await passengerService.findAll();

      // assert
      expect(result.type).to.be.equal(null);
      expect(result.message).to.deep.equal(allPassengers);
    });
  });
  
  afterEach(function () {
    sinon.restore();
  });
});