exports.seed = (knex) => {
  return knex('cars').insert([
    {
      id: 1,
      brand: 'Toyota',
      car: 'Yaris',
    },
    {
      id: 2,
      brand: 'Toyota',
      car: 'Corolla',
    },
    {
      id: 3,
      brand: 'Toyota',
      car: 'Rav4',
    },
  ])
}
