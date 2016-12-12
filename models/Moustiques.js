const Bookshelf = require('../bookshelf');
const bcrypt = require('bcrypt-then');
const _ = require('lodash');
const AuthToken = require('../models/AuthToken');

module.exports = Bookshelf.Model.extend({
  tableName: 'moustiques',
  fire: async function(userId) {
    if (this.get('owner') == userId)
      return await this.destroy();
    else {
      return -1;
    }
  }
}, {
  enrole: async function(userId, level) {
    const moustique = await (await new this({owner: userId, level: level}).save()).fetch();
    return moustique;
  },
  get: async function(userId) {
    const moustiques = await(await Bookshelf.knex.raw(`SELECT * FROM moustiques WHERE owner=?`, userId)).rows;
    return moustiques;
  },
  getById: async function(moustiqueId) {
    const moustique = await this.where({id: moustiqueId}).fetch();
    return moustique;
  }
});
