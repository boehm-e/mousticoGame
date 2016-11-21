exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.raw('ALTER TABLE places ALTER COLUMN end_time TYPE TIME WITH TIME ZONE'),
    knex.schema.raw('ALTER TABLE places ALTER COLUMN start_time TYPE TIME WITH TIME ZONE'),
    knex.schema.raw('ALTER TABLE places ALTER COLUMN type TYPE integer USING (type::integer);'),
    knex.schema.raw('ALTER TABLE bookings ALTER COLUMN session_start TYPE TIMESTAMP WITH TIME ZONE')
  ]);

};

exports.down = function(knex, Promise) {
};
