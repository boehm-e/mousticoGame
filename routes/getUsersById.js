const AuthToken = require('../models/AuthToken');
const User = require('../models/User');
const compose = require('connect-compose');
const wrapPromise = require('../utils/wrapPromise');
const bodyParser = require('body-parser');
const randomstring = require('randomstring');
const accessControl = require('../middlewares/canModifyOtherId');

module.exports = compose([bodyParser.urlencoded(), accessControl(User, []), wrapPromise(async function(req, res, next) {
  const userId = req.user.get('id');
  var users = await User.get(userId);

  return res.json({
    status: 1,
    message: "",
    data: users
  });

})]);
