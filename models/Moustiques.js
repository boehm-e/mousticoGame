const Bookshelf = require('../bookshelf');
const bcrypt = require('bcrypt-then');
const _ = require('lodash');
const AuthToken = require('../models/AuthToken');

module.exports = Bookshelf.Model.extend({
  tableName: 'moustiques',
  delete: async function() {
    return await this.destroy();
  }
}, {
  enrole: async function(userId, level) {
    const moustique = await (await new this({user_id: userId, level: level}).save()).fetch();
    return moustique;
  },
  get: async function(userId) {
    const moustiques = await(await Bookshelf.knex.raw(`SELECT * FROM moustiques WHERE user_id=?`, userId)).rows;
    return moustiques;
  }
});
