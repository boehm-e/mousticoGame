exports.up = function(knex, Promise) {
  return Promise.resolve(0).then(function() {
    return Promise.all([
      knex.schema.createTable('camps', function(table) {
        table.increments().primary();
        table.integer('capacity').notNullable().defaultTo(5);
        table.integer('level').notNullable().defaultTo(1);
        table.integer('owner').notNullable().references('users.id');
      })
    ]);
  });
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.raw('DROP TABLE if exists camps cascade')
  ]);
};
