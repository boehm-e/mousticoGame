exports.up = function(knex, Promise) {
    return Promise.resolve(0).then(function() {
        return Promise.all([
            knex.schema.raw('ALTER TABLE users ALTER COLUMN "phonePrefixNumber" DROP NOT NULL'),
            knex.schema.raw('ALTER TABLE users ALTER COLUMN "phoneNumber" DROP NOT NULL'),
            knex.schema.alterTable('users', function(table) {
                table.renameColumn('photo_url', 'photoUrl');
                table.renameColumn('stripe_id', 'stripeId');
                table.renameColumn('parent_code', 'parentCode');
                table.integer('weight');
                table.integer('height');
                table.integer('shape');
                table.string('handicap');
                table.dropColumn('username');
                table.string('pushNotificationToken');
            }),
        ])
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.alterTable('users', function(table) {
        table.renameColumn('photoUrl', 'photo_url');
        table.renameColumn('stripeId', 'stripe_id');
        table.renameColumn('parentCode', 'parent_code');
        table.dropColumn('weight');
        table.dropColumn('height');
        table.dropColumn('shape');
        table.dropColumn('handicap');
        knex.schema.raw('ALTER TABLE users ALTER COLUMN "phonePrefixNumber" SET NOT NULL'),
        knex.schema.raw('ALTER TABLE users ALTER COLUMN "phoneNumber" SET NOT NULL'),
        table.dropColumn('pushNotificationToken')
    });
};
