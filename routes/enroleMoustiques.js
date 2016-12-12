const AuthToken = require('../models/AuthToken');
const User = require('../models/User');
const compose = require('connect-compose');
const wrapPromise = require('../utils/wrapPromise');
const bodyParser = require('body-parser');
const randomstring = require('randomstring');
const accessControl = require('../middlewares/canModifyOtherId');

module.exports = compose([bodyParser.urlencoded(), accessControl(User, []), wrapPromise(async function(req, res, next) {
  if (req.body.number > 0 && req.body.level > 0) {
    var moustiques = await req.target.enroleMoustiques(req.body.number, req.body.level);
  }
  if (!moustiques) {
    return res.status(400).json({
      status: 0,
      message: "pas assez d'argent",
      data: null
    });
  }
  return res.json({
    status: 1,
    message: "",
    data: moustiques
  });

})]);
