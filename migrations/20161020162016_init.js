exports.up = function(knex, Promise) {
    // CREATE EXTENSION IF NOT EXISTS "postgis";
    // CREATE EXTENSION IF NOT EXISTS "postgis_topology";
    // DELETE FROM coaches; DELETE FROM users; DELETE FROM bookings; DELETE FROM places;DELETE FROM auth_tokens; DELETE FROM coaches_auth_tokens;

    // return knex.raw('CREATE EXTENSION IF NOT EXISTS "postgis"').then(function() {
    //     return knex.raw('CREATE EXTENSION IF NOT EXISTS "postgis_topology"');
    // }).then(function() {
    return Promise.resolve(0).then(function() {
        return Promise.all([
            knex.schema.createTable('users', function(table) {
                table.increments().primary();
                table.string('firstname').notNullable();
                table.string('lastname').notNullable();
                table.string('version');
                table.string('phone_prefix_indicator').notNullable();
                table.string('phone_number').notNullable();
                table.string('currency');
                table.boolean('tutorial').notNullable().defaultTo(true);
                table.integer('status').notNullable().defaultTo(0);
                table.string('stripe_id');
                table.string('parent_code');
                table.date('birthdate').notNullable();
                table.integer('gender').notNullable(); // TODO: Enum ?
                table.string('username').notNullable();
                table.string('salt');
                table.string('password').notNullable();
                table.boolean('active').notNullable().defaultTo(true);
                table.string('email').unique().notNullable();
                table.string("photo_url").notNullable().defaultTo("/static/default_avatar.png");
            }),
            knex.schema.createTable('coaches', function(table) {
                table.increments().primary();
                table.string('email').unique();
                table.string('password');
                table.string('firstname');
                table.string('lastname');
                table.string('photo_url');
                table.jsonb('files');
                table.specificType('pos', 'geometry(Point,4326)');
                // TODO: Should rating be calculated each time, or stored
            }),
            knex.schema.createTable('places', function(table) {
                table.increments().primary();
                table.string('name').notNullable();
                table.string('type').notNullable();
                table.string('address').notNullable();
                table.time('start_time').notNullable();
                table.time('end_time').notNullable();
                table.specificType('pos', 'geometry(Point,4326)').notNullable();
                // TODO: Would jsonb be better ? It could be...
                table.specificType('services', 'varchar(255)[]').notNullable().defaultTo('{}');
                table.specificType('transport', 'varchar(255)[]').notNullable().defaultTo('{}');
                // TODO: Should rating be calculated each time, or stored
                table.string('handicap');
            })
        ]);
    }).then(function() {
        return Promise.all([
            knex.schema.createTable('auth_tokens', function(table) {
                table.increments().primary();
                table.string('token').notNullable().unique();
                table.integer('user_id').unsigned().notNullable().references('users.id').onDelete('CASCADE');
            }),
            knex.schema.createTable('bookings', function(table) {
                table.increments().primary();
                table.integer('activity').notNullable();
                table.integer('user_id').unsigned().notNullable().references('users.id');
                table.integer('coach_id').unsigned().notNullable().references('coaches.id').onDelete('CASCADE');
                table.integer('place_id').unsigned().notNullable().references('places.id');
                table.dateTime('session_start').notNullable();
                table.float('rating');
                table.integer('improvments');
                table.string('comment');
                // TODO: unique(coach, time) ?
            }),
            knex.schema.createTable('creditcards', function(table) {
                table.increments().primary();
                table.integer('user_id').unsigned().notNullable().references('users.id');
            }),
            knex.schema.createTable('coach_followers', function(table) {
                table.increments().primary();
                table.integer('user_id').unsigned().notNullable().references('users.id');
                table.integer('coach_id').unsigned().notNullable().references('coaches.id');
            })
            //TODO: ask how teams work
        ]);
    });
    // });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('bookings').then(function() {
        return Promise.all([
            knex.schema.dropTable('users'),
            knex.schema.dropTable('coaches'),
            knex.schema.dropTable('places')
        ]);
    });
};
