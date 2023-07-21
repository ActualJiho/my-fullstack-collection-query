exports.seed = (knex) => {
  return knex('plates').del()
}
