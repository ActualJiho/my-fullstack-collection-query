exports.seed = (knex) => {
  return knex('cars').insert([
    {
      id: 1,
      brand: 'Toyota',
      name: 'Yaris',
    },
    {
      id: 2,
      brand: 'Toyota',
      name: 'Corolla',
    },
    {
      id: 3,
      brand: 'Toyota',
      name: 'Rav4',
    },
  ])
}
