const Bookshelf = require('../bookshelf');
const bcrypt = require('bcrypt-then');
const _ = require('lodash');
const AuthToken = require('../models/AuthToken');

module.exports = Bookshelf.Model.extend({
  tableName: 'blood_factory',
  hidden: ['password'],
  delete: async function() {
    return await this.destroy();
  }
}, {
  create: async function(userId) {
    const bloodFactory = await (await new this({owner: userId}).save()).fetch();
    return bloodFactory;
  },
  addBlood: async function(bloodObject, userId) {
    const availableBlood = _.pick(bloodObject, ['blood_A', 'blood_B', 'blood_AB', 'blood_O']);
    const bloodFactory = await this.query('where', 'owner', '=', userId).fetch();
    return await (await bloodFactory.set(availableBlood).save()).fetch();
  },
  get: async function(userId) {
    const factory = await(await Bookshelf.knex.raw(`SELECT * FROM blood_factory WHERE owner=?`, userId)).rows[0];
    return factory;
  }
});
