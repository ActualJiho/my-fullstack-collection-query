exports.seed = (knex) => {
  return knex('cars').del()
}
