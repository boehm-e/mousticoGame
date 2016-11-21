exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.alterTable('coaches', function(table) {
            table.string('version');
            table.string('phone_prefix_indicator');
            table.string('phone_number');
            table.string('currency');
            table.boolean('tutorial').notNullable().defaultTo(true);
            table.boolean('hasConfirmed').notNullable().defaultTo(false);
            table.integer('status');
            table.string('stripe_id');
            table.string('parent_code');
            table.date('birthdate');
            table.integer('gender');
            table.string('username');
            table.string('salt');
            // table.array('roles'); // ARRAY?
            table.boolean('active').notNullable().defaultTo(false);
            // TODO: Should rating be calculated each time, or stored
        }),
        knex.schema.createTable('coaches_auth_tokens', function(table) {
            table.increments().primary();
            table.string('token').notNullable().unique();
            table.integer('coach_id').unsigned().notNullable().references('coaches.id').onDelete("CASCADE");
        })
    ]);
};

exports.down = function(knex, Promise) {
    return knex.schema.alterTable('coaches', function(table) {
        table.dropColumn('version');
        table.dropColumn('phone_prefix_indicator');
        table.dropColumn('phone_number');
        table.dropColumn('currency');
        table.dropColumn('tutorial');
        table.dropColumn('hasConfirmed');
        table.dropColumn('status');
        table.dropColumn('stripe_id');
        table.dropColumn('parent_code');
        table.dropColumn('birthdate');
        table.dropColumn('gender');
        table.dropColumn('username');
        // table.dropColumn('roles'); // ARRAY?
        table.dropColumn('active');
    });
};
