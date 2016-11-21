
exports.up = function(knex, Promise) {
    return Promise.resolve(0).then(function() {
        return Promise.all([
            knex.schema.createTable('admin', function(table) {
                table.increments().primary();
                table.string('email').unique();
                table.string('password');
                table.string('firstname');
                table.string('lastname');
            }),
            knex.schema.dropTable('coaches_auth_tokens'),
            knex.schema.alterTable('auth_tokens', function(table) {
                // TODO: modify user_id
                table.integer('coach_id').unsigned().references("coaches.id").onDelete("CASCADE");
                table.integer('admin_id').unsigned().references('admin.id').onDelete("CASCADE");
            }),
            knex.schema.raw('ALTER TABLE auth_tokens ALTER COLUMN user_id DROP NOT NULL')
        ])
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('bookings').then(function() {
        return Promise.all([
            knex.schema.dropTable('admin'),
            knex.schema.dropTable('admin_auth_tokens'),
        ]);
    });
};
