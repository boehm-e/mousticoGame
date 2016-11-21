var Bookshelf = require('../bookshelf');
const path = require('path');
const fs = require('fs');
const AuthToken = require('../models/AuthToken');
const bcrypt = require('bcrypt-then');
const _ = require('lodash');

module.exports = Bookshelf.Model.extend({
    tableName: 'admin',
    hidden: ['password'],
    update: async function(body) {
        const realbody = _.pick(body, ['firstname', 'lastname', 'phonePrefixNumber', 'phoneNumber', 'currency', 'tutorial', 'status', 'stripe_id', 'parent_code', 'birthdate', 'gender', 'username', 'password', 'active', 'email']);
        if (realbody.password) {
            realbody.password = await bcrypt.hash(realbody.password, 10);
        }
        this.set(realbody);
        return await (await this.save()).fetch();
    },
    delete: async function() {
        // NEED TO DELETE TOKEN
        return await this.destroy();
    }
}, {
    get: async function(filters, params) {
        return await this.query( qb => {qb.offset(params.offset).limit(params.limit);})
        .fetchAll({columns: params.fields});
    },
    getById: async function(id) {
        return await this.query({where: {id}}).fetch();
    },
    find: async function(email, password) {
        if (!email || !password) {
            throw new Error("Email and password are required");
            return false;
        }
        const admin = await new this({ email: email }).fetch({ require: true });
        if (await bcrypt.compare(password, admin.get('password'))) {
            return admin;
        } else {
            throw new Error("Invalid password");
        }
    },
    create: async function(body) {
        const realbody = _.pick(body, ['firstname', 'lastname', 'username', 'password', 'email']);
        realbody.password = await bcrypt.hash(realbody.password, 10);
        const admin = await (await new this(realbody).save()).fetch();
        return admin;
    }
});
