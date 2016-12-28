const AuthToken = require('../models/AuthToken');
const User = require('../models/User');
const compose = require('connect-compose');
const wrapPromise = require('../utils/wrapPromise');
const bodyParser = require('body-parser');
const randomstring = require('randomstring');
const accessControl = require('../middlewares/canModifyOtherId');
const Moustiques = require('../models/Moustiques');

module.exports = compose([bodyParser.urlencoded(), accessControl(User, []), wrapPromise(async function(req, res, next) {
  console.log("SETMAP");
  var map = req.body.map;
  if (map) {
    await req.target.setMap(map)
    return res.status(400).json({
      status: 0,
      message: "La map a bien etee sauvegardee",
      data: null
    })
  }
  else {
    return res.status(400).json({
      status: 0,
      message: "pas de map en parametre",
      data: null
    })
  }
})]);
