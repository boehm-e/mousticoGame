module.exports = {
    development: {
        client: 'postgresql',
        connection: {
            database: 'moustico',
            user:     'moustico',
            password: 'moustico'
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: 'knex_migrations'
        }
    }
};
