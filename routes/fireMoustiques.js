const AuthToken = require('../models/AuthToken');
const User = require('../models/User');
const compose = require('connect-compose');
const wrapPromise = require('../utils/wrapPromise');
const bodyParser = require('body-parser');
const randomstring = require('randomstring');
const accessControl = require('../middlewares/canModifyOtherId');
const Moustiques = require('../models/Moustiques');

module.exports = compose([bodyParser.urlencoded(), accessControl(User, []), wrapPromise(async function(req, res, next) {
  if (req.params.moustiqueId) {
    var moustique = await Moustiques.getById(req.params.moustiqueId);
    if (moustique)
      var fire = await moustique.fire(req.target.get('id'))
    else {
      return res.status(400).json({
        status: 0,
        message: "ce moustique n'existe pas!",
        data: null
      })
    }
  }
  else {
    return res.status(400).json({
      status: 0,
      message: "Vous devez specifier le moustique a renvoyer",
      data: null
    });
  }


  console.log(fire);
  if (fire != -1) {
    return res.json({
      status: 1,
      message: "Vous venez de virer un moustique",
      data: null
    });
  } else {
    return res.status(400).json({
      status: 0,
      message: "ce moustique ne vous appartien pas!",
      data: null
    })
  }

})]);
