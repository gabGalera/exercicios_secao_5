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
    });

    describe('Cadastrando uma nova pessoa passageira', function () {
      it('ao enviar dados válidos deve salvar com sucesso!', async function () {
        // Arrange
        const res = {};
        // Aqui o mock do objeto req, atribui o objeto `passengerMock` ao atributo body
        const req = {
          body: passengerMock,
        };
  
        /* O dublê de `res.status` e `res.json` é o mesmo padrão que já fizemos anteriormente */
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        /* Definimos um dublê para `passengerService.createPassenger` para retornar o objeto
        de uma pessoa passageira com o id. */
        sinon
          .stub(passengerService, 'createPassenger')
          .resolves({ type: null, message: newPassengerMock });
  
        // Act
        await passengerController.createPassenger(req, res);
  
        // Assert
        /* Fazemos a asserção para garantir que o status retornado vai ser 201
        e que o json é o objeto newPassengerMock. */
        expect(res.status).to.have.been.calledWith(201);
        expect(res.json).to.have.been.calledWith(newPassengerMock);
      });
    });

    it('ao enviar um nome com menos de 3 caracteres deve retornar um erro!', async function () {
      // Arrange
      const res = {};
      /* Aqui mudamos o dublê de req.body com um valor inválido para o campo name */
      const req = {
        body: {
          name: 'Zé',
        },
      };

      /* O dublê de `res.status` e `res.json` é o mesmo padrão que já fizemos anteriormente */
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      /* Definimos um dublê para `passengerService.createPassenger` para retornar o erro
      no contrato estabelecido na camada Service */
      sinon
        .stub(passengerService, 'createPassenger')
        .resolves(
          { type: 'INVALID_VALUE', message: '"name" length must be at least 3 characters long' },
        );

      // Act
      await passengerController.createPassenger(req, res);

      // Assert
      /* O status HTTP retornado deve ser 422 */
      expect(res.status).to.have.been.calledWith(422);
      /* Ajustamos a mensagem de erro esperada para ser a mensagem gerada pelo service */
      expect(res.json).to.have.been.calledWith('"name" length must be at least 3 characters long');
    });
  
  afterEach(function () {
    sinon.restore();
  });
});