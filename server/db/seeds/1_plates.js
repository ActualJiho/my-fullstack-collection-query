exports.seed = (knex) => {
  return knex('plates').insert([
    {
      id: 1,
      plate: 'CLULSS',
      location: 'Christchurch',
    },
    {
      id: 2,
      plate: 'DINH',
      location: 'Christchurch',
    },
    {
      id: 3,
      plate: 'BAOMA',
      location: 'Christchurch',
    },
  ])
}
