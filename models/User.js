const Bookshelf = require('../bookshelf');
const bcrypt = require('bcrypt-then');
const _ = require('lodash');
const AuthToken = require('../models/AuthToken');

module.exports = Bookshelf.Model.extend({
  tableName: 'users',
  hidden: ['password'],
  delete: async function() {
    return await this.destroy();
  }
}, {
  create: async function(body) {
    const realbody = _.pick(body, ['email', 'password', 'firstname', 'lastname']);
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