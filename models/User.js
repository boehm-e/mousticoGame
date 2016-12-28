const Bookshelf = require('../bookshelf');
const bcrypt = require('bcrypt-then');
const _ = require('lodash');
const AuthToken = require('../models/AuthToken');
const BloodFactory = require('../models/BloodFactory');
const Moustiques = require('../models/Moustiques');

module.exports = Bookshelf.Model.extend({
  tableName: 'users',
  hidden: ['password'],
  delete: async function() {
    return await this.destroy();
  },
  enroleMoustiques: async function(number, level) {
    // abc = await this.payMoustique(19, 1, ['blood_A', 'blood_B', 'blood_AB', 'blood_O']);
    // console.log(abc);
    const id = this.get('id');
    const factory = await BloodFactory.get(id);
    const moustique_price = 10;
    const total_litre = Object.values(_.pick(factory, ['blood_A', 'blood_B', 'blood_AB', 'blood_O'])).reduce((pv, cv) => pv+cv, 0)
    console.log(total_litre);
    var _moustiques = [];
    for (var i = 0; i < number; i++) {
      await Moustiques.enrole(id, level);
    }
    return await Moustiques.get(id);
  },
  payMoustique: async function(price, moustiqueId, availableBlood) {
    const bloodFactory = await BloodFactory.query('where', 'owner', '=', this.get('id')).fetch();
    const moustique = await Moustiques.getById(moustiqueId);

    // CHECK INOUGH MONEY
    const blood = _.pick(bloodFactory.toJSON(), availableBlood);
    const totalMoney = Object.values(blood).reduce((first,second) => first+second)
    // if (totalMoney < price)
    //   return null;
    for (var i in blood) {
      if (blood[i] >= price) {
        blood[i] -= price;
        return await (await bloodFactory.set(blood).save()).fetch();
      } else {
        price -= blood[i];
        blood[i] = 0;
      }
    }
    return null;
  },
  setMap: async function(map) {
    return await (await this.set({map: map}).save()).fetch();
  }
}, {
  create: async function(body) {
    const realbody = _.pick(body, ['email', 'password', 'firstname', 'lastname']);
    realbody.password = await bcrypt.hash(realbody.password, 10);
    const user = await (await new this(realbody).save()).fetch();
    const factory = await BloodFactory.create(user.get('id'));
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
    const factory = await BloodFactory.get(user.id);
    const moustiques = await Moustiques.get(user.id);
    return {
      user: user,
      factory: factory,
      moustiques: moustiques
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
