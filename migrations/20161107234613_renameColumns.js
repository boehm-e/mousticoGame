exports.up = function(knex, Promise) {
  return knex.schema.alterTable('users', function(table) {
    table.renameColumn('birthdate', 'birthDate');
    table.renameColumn('phone_number', 'phoneNumber');
    table.renameColumn('phone_prefix_indicator', 'phonePrefixNumber');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.alterTable('users', function(table) {
    table.renameColumn('birthDate', 'birthdate');
    table.renameColumn('phoneNumber', 'phone_number');
    table.renameColumn('phonePrefixNumber', 'phone_prefix_indicator');
  });
};
