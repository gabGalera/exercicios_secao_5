const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { passengerService } = require('../../../src/services');
const { passengerController } = require('../../../src/controllers');
const {
  passengerListMock,
  passengerMock,
  newPassengerMock,
} = require('./mocks/passenger.controller.mock');

describe('Teste de unidade do passengerController', function () {
  describe('Listando as pessoas passageiras', function () {
    it('Deve retornar o status 200 e a lista', async function () {
      // arrange
      const res = {};
      const req = {};
      
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(passengerService, 'findAll')
        .resolves({ type: null, message: passengerListMock });

      // act
      await passengerController.listPassengers(req, res);

      // assert
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(passengerListMock);
    });
  });
  
  describe('Buscando uma pessoa passageira', function () {
    it('deve responder com 200 e os dados do banco quando existir', async function () {
      // Arrange
      const res = {};
      const req = {
        params: { id: 1 },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(passengerService, 'findById')
        .resolves({ type: null, message: newPassengerMock });

      // Act
      await passengerController.getPassenger(req, res);

      // Assert
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(newPassengerMock);
    });

    describe('Buscando uma pessoa passageira', function () {
      it('deve responder com 200 e os dados do banco quando existir', async function () {
        // Arrange
        const res = {};
        const req = {
          params: { id: 1 },
        };
  
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        sinon
          .stub(passengerService, 'findById')
          .resolves({ type: null, message: newPassengerMock });
  
        // Act
        await passengerController.getPassenger(req, res);
  
        // Assert
        expect(res.status).to.have.been.calledWith(200);
        expect(res.json).to.have.been.calledWith(newPassengerMock);
      });
    });
  });

  afterEach(function () {
    sinon.restore();
  });
});