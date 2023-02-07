const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../src/models/connection');
const { travelModel } = require('../../../src/models');

const { newTravel, travels, travelsFromDB } = require('./mocks/travel.model.mock');

describe('Testes de unidade do model de viagens', function () {
  it('Realizando uma operação INSERT com o model travel', async function () {
    // arrange
    sinon.stub(connection, 'execute').resolves([{ insertId: 42 }]);

    // act
    const result = await travelModel.insert(newTravel);

    // assert
    expect(result).to.equal(42);
  });

  it('Recuperando uma travel a partir do seu id', async function () {
    // arrange
    sinon.stub(connection, 'execute').resolves([[travelsFromDB[0]]]);
    // act
    const result = await travelModel.findById(1);
    // assert
    expect(result).to.be.deep.equal(travels[0]);
  });
  
  afterEach(function () {
    sinon.restore();
  });
});