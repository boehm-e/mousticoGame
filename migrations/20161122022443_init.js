exports.up = function(knex, Promise) {
  return Promise.resolve(0).then(function() {
    return Promise.all([
      knex.schema.createTable('users', function(table) {
        table.increments().primary();
        table.string('email').unique();
        table.string('password');
        table.string('firstname');
        table.string('lastname');
        table.integer('mousticoHouse').references('mousticoHouses.id');
      }),
      knex.schema.createTable('mousticoHouses', function(table) {
        table.increments().primary();
        table.integer('level').notNullable().defaultTo(1);
        table.integer('blood');
        table.integer('created_by').notNullable().references('users.id').unique();
        table.integer('owner');
      }),
      knex.schema.createTable('moustiques', function(table) {
        table.increments().primary();
        table.integer('mousticoHouseId').references('mousticoHouses.id').onDelete('CASCADE');;
        table.integer('userId').references('users.id');
        table.integer('level').notNullable().defaultTo(1);
        table.integer('blood_AB_negatif').notNullable().defaultTo(0);
        table.integer('blood_AB_positif').notNullable().defaultTo(0);
        table.integer('blood_A_negatif').notNullable().defaultTo(0);
        table.integer('blood_A_positif').notNullable().defaultTo(0);
        table.integer('blood_B_negatif').notNullable().defaultTo(0);
        table.integer('blood_B_positif').notNullable().defaultTo(0);
        table.integer('blood_O_negatif').notNullable().defaultTo(0);
        table.integer('blood_O_positif').notNullable().defaultTo(0);
      }),
      knex.schema.createTable('auth_tokens', function(table) {
        table.increments().primary();
        table.string('token').notNullable().unique();
        table.integer('userId').unsigned().notNullable().references('users.id').onDelete('CASCADE');
      })
    ]);
  });
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.alterTable('users', function(table) {
      table.dropForeign('mousticohouse')
    }),
    knex.schema.alterTable('moustiques', function(table) {
      table.dropForeign('mousticohouseid')
    }),
    knex.schema.dropTable('moustiques'),
    knex.schema.dropTable('auth_tokens'),
    knex.schema.dropTable('mousticoHouses'),
    knex.schema.dropTable('users')
  ])
};
