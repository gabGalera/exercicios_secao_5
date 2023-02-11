const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { travelService, driverService } = require('../../../src/services');
const { driverController } = require('../../../src/controllers');
const { correctReturnTravel, allDrivers } = require('./mocks/driver.controller.mock');

describe('Teste de unidade do driverController', function () {
  describe('Buscando as viagens em aberto', function () {
    it('quando não tem nenhuma viagem cadastrada retorna um array vazio', async function () {
      const res = {};
      const req = {};
  
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
  
      sinon
        .stub(travelService, 'getWaitingDriverTravels')
        .resolves({ type: null, message: [] });
  
        await driverController.openTravel(req, res);
  
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith([]);
    });
  });

  describe('Atribuições de viagem com erros de id inexistente', function () {
    it('travelId inexistente status 404 e mensagem travelId not found', async function () {
      const res = {};
      const req = { params: { travelId: 9999, driverId: 1 }, body: { } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(travelService, 'travelAssign')
        .resolves({ type: 'TRAVEL_NOT_FOUND', message: '"travelId" not found' });

      await driverController.travelAssign(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith('"travelId" not found');
    });

    it('driverId inexistente status 404 e mensagem driverId not found', async function () {
      const res = {};
      const req = { params: { travelId: 1, driverId: 9999 }, body: { } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(travelService, 'travelAssign')
        .resolves({ type: 'DRIVER_NOT_FOUND', message: '"driverId" not found' });

      await driverController.travelAssign(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith('"driverId" not found');
    });
  });

  describe('Atribuições de viagem com motorista ocupado', function () {
    it('retorna status 409 e mensagem travel already assigned', async function () {
      const res = {};
      const req = { params: { travelId: 1, driverId: 1 }, body: { } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(travelService, 'travelAssign')
        .resolves({ type: 'TRAVEL_CONFLICT', message: 'travel already assigned' });

      await driverController.travelAssign(req, res);

      expect(res.status).to.have.been.calledWith(409);
      expect(res.json).to.have.been.calledWith('travel already assigned');
    });
  });

  describe('Atribuições de viagem com sucesso', function () {
    it('retorna status 200 e objeto com resultado', async function () {
      const res = {};
      const req = { params: { travelId: 1, driverId: 1 }, body: { } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(travelService, 'travelAssign')
        .resolves({ type: null, message: correctReturnTravel });

      await driverController.travelAssign(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith({
          id: 1,
          passengerId: 1,
          driverId: null,
          travelStatusId: 2,
          startingAddress: 'Start',
          endingAddress: 'End',
          requestDate: '2022-08-24T03:04:04.374Z',
      });
    });
  });

  describe('Buscando todos os motoristas', function () {
    it('Testa caminho do sucesso', async function () {
      const res = {};
      const req = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(driverService, 'getDrivers')
        .resolves({ type: null, message: allDrivers });
    
      await driverController.getDrivers(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(allDrivers);
      });

      it('Testa um caminho de falha', async function () {
        const res = {};
        const req = {};
  
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        sinon.stub(driverService, 'getDrivers')
          .resolves({ type: 'DRIVER_NOT_FOUND', message: '' });
      
        await driverController.getDrivers(req, res);
  
        expect(res.status).to.have.been.calledWith(404);
        expect(res.json).to.have.been.calledWith('');
        });
  });

  afterEach(function () {
    sinon.restore();
  });
});