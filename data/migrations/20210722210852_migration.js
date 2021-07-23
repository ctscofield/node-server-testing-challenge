
exports.up = function(knex) {
  return knex.schema.createTable('resource', tbl => {
    tbl.increments()
    tbl.string('name')
  } )
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('resource')
};
