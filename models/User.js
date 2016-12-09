const Bookshelf = require('../bookshelf');
const bcrypt = require('bcrypt-then');
const _ = require('lodash');
const AuthToken = require('../models/AuthToken');
const bloodFactory = require('../models/BloodFactory');

module.exports = Bookshelf.Model.extend({
  tableName: 'users',
  hidden: ['password'],
  delete: async function() {
    return await this.destroy();
  }
}, {
  create: async function(body) {
    const realbody = _.pick(body, ['email', 'password', 'firstname', 'lastname']);
    realbody.password = await bcrypt.hash(realbody.password, 10);
    const user = await (await new this(realbody).save()).fetch();
    const factory = await bloodFactory.create(user.get('id'));
    return {
      user,
      factory
    };
  },
  login: async function(email, password) {
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
    const user = await(await Bookshelf.knex.raw(`SELECT * FROM users WHERE id=?`, id)).rows[0]
    const factory = await bloodFactory.get(user.id);
    return {
      user: user,
      factory: factory
    };
  },
  getAll: async function() {
    var users = await Bookshelf.knex.raw(`
      SELECT "blood_A",
             "blood_B",
             "blood_AB",
             "blood_O",
             blood_factory.level,
             users.id AS "userId"
      FROM blood_factory
      LEFT JOIN users ON blood_factory.owner=users.id;
      `);
    return users.rows;
  }
});
