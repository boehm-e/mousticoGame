const Cron = require('croner');
const AuthToken = require('../models/AuthToken');
const User = require('../models/User');
const bloodFactory = require('../models/BloodFactory');

async function abc(io) {
  for (var i in io.sockets.connected ) {
    const _token = io.sockets.connected[i].token;
    let token = await new AuthToken({ token: _token }).fetch({withRelated:['user']});
    let user = token.related('user');
    // user = (await User.get(user.get('id')));
    user.payMoustique();
  }

}
exports = module.exports = (io) => {
  setTimeout(function(){
    abc(io)
  }, 5000)



  // UPDATE BLOOD EVERY 60 SECONDES
  Cron('0 * * * * *', async function() {
    for (var i in io.sockets.connected ) {
      const _token = io.sockets.connected[i].token;
      let token = await new AuthToken({ token: _token }).fetch({withRelated:['user']});
      let user = token.related('user');
      user = (await User.get(user.get('id')));
      console.log(user);
    }
  });
};
