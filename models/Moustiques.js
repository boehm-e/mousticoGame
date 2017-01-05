const Bookshelf = require('../bookshelf');
const bcrypt = require('bcrypt-then');
const _ = require('lodash');
const AuthToken = require('../models/AuthToken');
const BloodFactory = require('../models/BloodFactory');

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
  enrole: async function(userId, level, number) {
    const factory = await BloodFactory.get(userId);
    const total_litre = Object.values(_.pick(factory, ['blood_A', 'blood_B', 'blood_AB', 'blood_O'])).reduce((pv, cv) => pv+cv, 0)

    console.log("TOTAL LITRE: ", (total_litre));
    console.log("PRICE: ", (level*number*0.5));
    if (total_litre > (level * number * 0.5)) {
      let sql = `INSERT INTO moustiques (owner, level) VALUES`;
      for (var i = 0; i < number; i++) {
        sql += ` (:userId, :level)`;
        if (i+1 != number)
        sql += ',';
      }
      const moustiques = await (await Bookshelf.knex.raw(sql, {userId: userId, level: level}));
    } else {
    }
    return ;

    // return moustique;

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
