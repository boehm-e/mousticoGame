const Cron = require('croner');
const User = require('../models/User');
const bloodFactory = require('../models/BloodFactory');

exports.init = () => {
  // UPDATE BLOOD EVERY 60 SECONDES

  Cron('*/3 * * * * *', async function() {
    const users = await User.getAll();
    console.log("-- updating blood");
    users.map(v => {
      v.blood_A += v.level * 10;
      v.blood_B += v.level * 10;
      v.blood_AB += v.level * 10;
      v.blood_O += v.level * 10;
      bloodFactory.addBlood(v, v.userId);
    })
  });
};
