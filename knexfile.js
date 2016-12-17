module.exports = {
    development: {
        client: 'postgresql',
        connection: {
            host:     '172.42.0.15',
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
