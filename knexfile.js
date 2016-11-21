module.exports = {
    development: {
        client: 'postgresql',
        connection: {
            database: 'fitters-dev',
            user:     'fitters-dev',
            password: 'fitters-dev'
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: 'knex_migrations'
        }
    },
    ci: {
        client: 'postgresql',
        connection: {
            host: 'mdillon__postgis',
            database: 'fitters-test',
            user: 'fitters-test',
            password: 'fitters-test'
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: 'knex_migrations'
        }
    },
    production: {
        client: 'postgresql',
        connection: {
            host: "localhost",
            database: "fitersdb",
            user: "fiters",
            password: "fiters2016!!"
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
