const AuthToken = require('../models/AuthToken');
const User = require('../models/User');
const compose = require('connect-compose');
const wrapPromise = require('../utils/wrapPromise');
const bodyParser = require('body-parser');
const randomstring = require('randomstring');

module.exports = compose([bodyParser.urlencoded(), wrapPromise(async function(req, res, next) {
  var users = await User.get(req.params.id);

  return res.json({
    status: 1,
    message: "",
    data: users
  });

})]);
