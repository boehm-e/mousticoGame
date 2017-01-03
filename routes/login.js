const AuthToken = require('../models/AuthToken');
const User = require('../models/User');
const compose = require('connect-compose');
const wrapPromise = require('../utils/wrapPromise');
const bodyParser = require('body-parser');
const randomstring = require('randomstring');

module.exports = compose([bodyParser.urlencoded(), wrapPromise(async function(req, res, next) {
  try {
    var user = await User.login(req.body.email, req.body.password);
  } catch (e) {
    next(e);
  }

  const token = await new AuthToken({
    user_id: user.get('id'),
    token: randomstring.generate({ length: 32 })
  }).save();

  return res.json({
    status: 1,
    message: "",
    data: {
      token: token.get('token'),
      ...user.toJSON()
    }
  });

})]);
