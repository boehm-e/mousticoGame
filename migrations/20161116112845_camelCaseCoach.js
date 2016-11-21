exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.alterTable('coaches', function(table) {
            table.renameColumn('photo_url', 'photoUrl');
            table.renameColumn('phone_number', 'phoneNumber');
            table.renameColumn('phone_prefix_indicator', 'phonePrefixNumber');
            table.renameColumn('stripe_id', 'stripeId');
            table.renameColumn('parent_code', 'parentCode');
        }),
        knex.schema.alterTable('coach_followers', function(table) {
            table.renameColumn('user_id', 'userId');
            table.renameColumn('coach_id', 'coachId');
        }),
        knex.schema.alterTable('bookings', function(table) {
            table.renameColumn('user_id', 'userId');
            table.renameColumn('coach_id', 'coachId');
            table.renameColumn('place_id', 'placeId');
            table.renameColumn('session_start', 'sessionStart');
        }),
        knex.schema.alterTable('auth_tokens', function(table) {
            table.renameColumn('user_id', 'userId');
            table.renameColumn('coach_id', 'coachId');
            table.renameColumn('admin_id', 'adminId');
        })
    ]);
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.alterTable('coaches', function(table) {
            table.renameColumn('photoUrl', 'photo_url');
            table.renameColumn('phoneNumber', 'phone_number');
            table.renameColumn('phonePrefixNumber', 'phone_prefix_indicator');
            table.renameColumn('stripeId', 'stripe_id');
            table.renameColumn('parentCode', 'parent_code');
        }),
        knex.schema.alterTable('coach_followers', function(table) {
            table.renameColumn('userId', 'user_id');
            table.renameColumn('coachId', 'coach_id');
        }),
        knex.schema.alterTable('bookings', function(table) {
            table.renameColumn('userId', 'user_id');
            table.renameColumn('coachId', 'coach_id');
            table.renameColumn('placeId', 'place_id');
            table.renameColumn('sessionStart', 'session_start');
        }),
        knex.schema.alterTable('auth_tokens', function(table) {
            table.renameColumn('userId', 'user_id');
            table.renameColumn('coachId', 'coach_id');
            table.renameColumn('adminId', 'admin_id');
        })
    ]);
};
