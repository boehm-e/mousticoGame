var Bookshelf = require('../bookshelf');
const path = require('path');
const fs = require('fs');
const AuthToken = require('../models/AuthToken');
const bcrypt = require('bcrypt-then');
const _ = require('lodash');

module.exports = Bookshelf.Model.extend({
    tableName: 'coaches',
    hidden: ['password'],
    followers: function() {
        return this.belongsToMany(require('./User'), 'coach_followers', 'coachId', 'userId');
    },
    update: async function(realbody) {
        if (realbody.password) {
            realbody.password = await bcrypt.hash(realbody.password, 10);
        }
        this.set(realbody);
        return await (await this.save()).fetch();
    },
    delete: async function() {
        // NEED TO DELETE TOKEN
        return await this.destroy();
    },
    linkNewFile: async function(json) {
        await this.set({files: json});
        return await this.save();
    }
},
{
    get: async function(filters, params) {
        return await this.query( qb => {qb.offset(params.offset).limit(params.limit);})
        .fetchAll({columns: params.fields});
    },
    getById: async function(id) {
        return await this.query({where: {id}}).fetch();
    },
    getByEmail: async function(email) {
        return await this.query({where: {email}}).fetch();
    },
    find: async function(email, password) {
        if (!email || !password) throw new Error("Email and password are required");
        const coach = await new this({ email: email }).fetch({ require: true });
        if (await bcrypt.compare(password, coach.get('password')) && coach.get('hasConfirmed') === true) {
            return coach;
        } else if(coach.get('hasConfirmed') !== true) {
            throw new Error("A coach needs to activate his account");
        } else {
            throw new Error("Invalid password");
        }
    },
    create: async function(body) {
        const realbody = _.pick(body, ['version', 'firstname', 'lastname', 'phonePrefixNumber', 'phoneNumber', 'currency', 'tutorial', 'status', 'stripeId', 'parentCode', 'birthdate', 'gender', 'username', 'username', 'password', 'roles', 'active', 'email', 'photoUrl']);
        realbody.password = await bcrypt.hash(realbody.password, 10);
        realbody.hasConfirmed = true;
        const coach = await (await new this(realbody).save()).fetch();
        return coach;
    },
    createWebsite: async function(body) { // HERE NEED MAIL VALIDATION
        const realbody = _.pick(body, ['version', 'firstname', 'lastname', 'phonePrefixNumber', 'phoneNumber', 'currency', 'tutorial', 'status', 'stripeId', 'parentCode', 'birthdate', 'gender', 'username', 'username', 'password', 'roles', 'active', 'email', 'photoUrl']);
        realbody.password = await bcrypt.hash(realbody.password, 10); // TODO: TO REMOVE IF U WANT TO VALIDATE WITH EMAIL
        realbody.hasConfirmed = false;
        const coach = await (await new this(realbody).save()).fetch();
        return coach;
    },
    mailActivation: async function(token) {
        let tkn = await new AuthToken({ token: token }).fetch({withRelated:['coach']});
        console.log("\n\n\n\nTKNNN : ", tkn, "\n\n\n");
        let coach = tkn.related('coach');
        await coach.set({hasConfirmed: true});
        return await coach.save();
    },
    delete: async function(id) {
        try {
            var destroy = await new this({id: id}).destroy({require: true});
        } catch (e) {
            return false;
        }
        return true;
    },
    getFile: async function(name,res) {
        const uploadsPath = require('../config.json').uploads;
        console.log(name, uploadsPath);
        res.sendFile(path.join(process.cwd(), uploadsPath, name));
    },
    follow: function(user, body) {
        return user.following().attach(body.coach_id);
    }
});
