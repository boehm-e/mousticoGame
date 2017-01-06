const Bookshelf = require('../bookshelf');
const bcrypt = require('bcrypt-then');
const _ = require('lodash');
const AuthToken = require('../models/AuthToken');
const BloodFactory = require('../models/BloodFactory');
const User = require('../models/User');

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
    var totalPrice = number * level * 1000

    // CREATE MOUSTIQUES
    console.log("TOTAL LITRE : ",total_litre);
    console.log("TOTAL PRICE : ",totalPrice);
    if (number <= 0)
      return null;
    if (total_litre >= totalPrice) { // SI ASSEZ DE SANG
      let sql = `INSERT INTO moustiques (owner, level) VALUES`;
      for (var i = 0; i < number; i++) {
        sql += ` (:userId, :level)`;
        if (i+1 != number)
        sql += ',';
      }
      const moustiques = await (await Bookshelf.knex.raw(sql, {userId: userId, level: level}));

      // PAY MOUSTIQUES;
      const blood = _.pick(factory, ['blood_A', 'blood_B', 'blood_AB', 'blood_O']);
      const bloodFactory = await BloodFactory.query('where', 'owner', '=', userId).fetch();
      for (var i in blood) {
        if (blood[i] >= totalPrice) {
          blood[i] -= totalPrice;
          return await (await bloodFactory.set(blood).save()).fetch();
        } else {
          totalPrice -= blood[i];
          blood[i] = 0;
        }
        if ( totalPrice <= 0 ) {
          return await (await bloodFactory.set(blood).save()).fetch();
        }
      }





      return moustiques;
    } else {
      return null
    }



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
