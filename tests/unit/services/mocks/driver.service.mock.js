const allDrivers = {
  type: null,
  message: [
    { id: 1, name: 'Liana Cisneiros' },
    { id: 2, name: 'Fábio Frazão' },
    { id: 3, name: 'Anastacia Bicalho' },
    { id: 4, name: 'Samara Granjeiro' },
    { id: 5, name: 'Levi Teixeira' },
  ],
}

const newDriver = {
  type: null,
  message: {
    id: 1,
    name: 'Gus',
    cars: [
      {
        color: 'Branco',
        id: 1,
        licensePlate: 'NCA-0956',
        model: 'Renault Sandero',
      },
      {
        color: 'Vermelho',
        id: 2,
        licensePlate: 'DZG-4376',
        model: 'Volkswagen Gol',
      },
    ],
  }
}

const carsList = [
  {
    id: 1,
    model: 'Renault Sandero',
    color: 'Branco',
    licensePlate: 'NCA-0956',
  },
  {
    id: 2,
    model: 'Volkswagen Gol',
    color: 'Vermelho',
    licensePlate: 'DZG-4376',
  },
  {
    id: 3,
    model: 'Chevrolet Onix',
    color: 'Prata',
    licensePlate: 'KBJ-2899',
  },
  {
    id: 4,
    model: 'Renault Logan',
    color: 'Azul',
    licensePlate: 'NFA-9035',
  },
  {
    id: 5,
    model: 'Fiat Siena',
    color: 'Cinza',
    licensePlate: 'HTH-9177',
  },
  {
    id: 6,
    model: 'Nissan Versa',
    color: 'Preto',
    licensePlate: 'BGY-6802',
  },
]

module.exports = {
  allDrivers,
  newDriver,
  carsList,
};
