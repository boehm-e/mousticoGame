const AuthToken = require('../models/AuthToken');
const User = require('../models/User');
const compose = require('connect-compose');
const wrapPromise = require('../utils/wrapPromise');
const bodyParser = require('body-parser');
const randomstring = require('randomstring');
const accessControl = require('../middlewares/canModifyOtherId');

module.exports = compose([bodyParser.urlencoded(), wrapPromise(async function(req, res, next) {
  var users = await User.getAll();

  return res.json({
    status: 1,
    message: "",
    data: users
  });

})]);
