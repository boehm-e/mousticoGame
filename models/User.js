const Bookshelf = require('../bookshelf');
const bcrypt = require('bcrypt-then');
const _ = require('lodash');
const AuthToken = require('../models/AuthToken');

module.exports = Bookshelf.Model.extend({
    tableName: 'users',
    hidden: ['password'],
    following: function() {
        return this.belongsToMany(require('./Coach'), 'coach_followers', 'userId', 'coachId');
    },
    likePlace: function() {
        return this.belongsToMany(require('./Place'), 'place_like', 'userId', 'placeId');
    },
    update: async function(body) {
        const realbody = _.pick(body, ['firstname', 'lastname', 'email', 'birthDate', 'gender', 'phoneNumber', 'phonePrefixNumber', 'password', 'weight', 'height', 'shape', 'handicap', 'pushNotificationToken']);
        if (realbody.password) {
            realbody.password = await bcrypt.hash(realbody.password, 10);
        }

        this.set(realbody);
        return await this.save();
    },
    delete: async function() {
        // NEED TO DELETE TOKEN
        return await this.destroy();
    }
}, {
    create: async function(body) {
        const realbody = _.pick(body, ['firstname', 'lastname', 'email', 'birthDate', 'gender', 'phoneNumber', 'phonePrefixNumber', 'password']);
        console.log("\n\nREALBODY : ",realbody);
        realbody.password = await bcrypt.hash(realbody.password, 10);
        const user = await (await new this(realbody).save()).fetch();
        return user;
    },
    find: async function(email, password) {
        if (!email || !password) throw new Error("Email and password are required");
        const user = await new this({ email: email.toLowerCase().trim() }).fetch({ require: true });
        if (await bcrypt.compare(password, user.get('password'))) {
            return user;
        } else {
            throw new Error("Invalid password");
        }
    },
    delete: async function(id) {
        try {
            var destroy = await new this({id: id}).destroy({require: true});
        } catch (e) {
            return false;
        }
        return true;
    },
    get: async function(id) {
        try {
            var user = await new this({id: id}).fetch();
        } catch (e) {
            return false;
        }
        return user;
    }
});
