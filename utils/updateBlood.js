const Cron = require('croner');
const AuthToken = require('../models/AuthToken');
const User = require('../models/User');
const bloodFactory = require('../models/BloodFactory');

exports = module.exports = (io) => {
  // UPDATE BLOOD EVERY 60 SECONDES
  Cron('*/1 * * * * *', async function() {
    for (var i in io.sockets.connected ) {
      const _token = io.sockets.connected[i].token;
      let token = await new AuthToken({ token: _token }).fetch({withRelated:['user']});
      let user = token.related('user');
      user = (await User.get(user.get('id')));
      var blood = {};
      var blood = user.factory;
      blood.blood_A += parseInt(user.user.level) * 0;
      blood.blood_B += parseInt(user.user.level) * 0;
      blood.blood_AB += parseInt(user.user.level) * 0;
      blood.blood_O += parseInt(user.user.level) * 0;
      io.sockets.connected[i].emit('blood', blood);
      bloodFactory.addBlood(blood, user.user.id);
    }
  });
};
