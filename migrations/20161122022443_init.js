exports.up = function(knex, Promise) {
  return Promise.resolve(0).then(function() {
    return Promise.all([
      knex.schema.createTable('users', function(table) {
        table.increments().primary();
        table.string('email').unique();
        table.string('password');
        table.string('firstname');
        table.string('lastname');
        table.jsonb('map');
        table.integer('level').notNullable().defaultTo(1);
      }),
      knex.schema.createTable('moustiques', function(table) {
        table.increments().primary();
        table.integer('owner').references('users.id').onDelete('CASCADE');
        table.integer('level').notNullable().defaultTo(1);
        table.integer('blood_A').notNullable().defaultTo(0);
        table.integer('blood_B').notNullable().defaultTo(0);
        table.integer('blood_AB').notNullable().defaultTo(0);
        table.integer('blood_O').notNullable().defaultTo(0);
        table.boolean('is_out').notNullable().defaultTo(false);
      }),
      knex.schema.createTable('blood_factory', function(table) {
        table.increments().primary();
        table.integer('blood_A').notNullable().defaultTo(1000);
        table.integer('blood_B').notNullable().defaultTo(1000);
        table.integer('blood_AB').notNullable().defaultTo(1000);
        table.integer('blood_O').notNullable().defaultTo(1000);
        table.integer('level').notNullable().defaultTo(1);
        table.integer('owner').references('users.id').unique().onDelete('CASCADE');
      }),
      knex.schema.createTable('auth_tokens', function(table) {
        table.increments().primary();
        table.string('token').notNullable().unique();
        table.integer('user_id').unsigned().notNullable().references('users.id').onDelete('CASCADE');
      })
    ]);
  });
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.raw('DROP TABLE if exists moustiques cascade'),
    knex.raw('DROP TABLE if exists auth_tokens cascade'),
    knex.raw('DROP TABLE if exists users cascade'),
    knex.raw('DROP TABLE if exists blood_factory cascade')
  ])
};
