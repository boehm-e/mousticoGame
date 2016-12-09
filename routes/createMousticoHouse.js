const AuthToken = require('../models/AuthToken');
const MousticoHouse = require('../models/MousticoHouse');
const compose = require('connect-compose');
const wrapPromise = require('../utils/wrapPromise');
const bodyParser = require('body-parser');
const randomstring = require('randomstring');

module.exports = compose([bodyParser.urlencoded(), wrapPromise(async function(req, res, next) {
  var house = await MousticoHouse.create(req.user.get('id'));

  return res.json({
    status: 1,
    message: "",
    data: house
  });
})]);
