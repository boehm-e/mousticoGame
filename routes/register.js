const AuthToken = require('../models/AuthToken');
const User = require('../models/User');
const compose = require('connect-compose');
const wrapPromise = require('../utils/wrapPromise');
const bodyParser = require('body-parser');
const randomstring = require('randomstring');

module.exports = compose([bodyParser.urlencoded(), wrapPromise(async function(req, res, next) {
  var user = await User.create(req.body);

  const token = await new AuthToken({
    userId: user.get('id'),
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
