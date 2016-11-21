const AuthToken = require('../models/AuthToken');
const User = require('../models/User');
const compose = require('connect-compose');
const wrapPromise = require('../utils/wrapPromise');
const bodyParser = require('body-parser');
const randomstring = require('randomstring');

module.exports = compose([bodyParser.urlencoded(), wrapPromise(async function(req, res, next) {
    try {
        var user = await User.find(req.body.login, req.body.password);
    } catch (e) {
        if (e instanceof Error && (e.message == 'EmptyResponse' || e.message == 'Invalid password')) {
            return res.status(403).json({ status: 0, message: e.message, data: e });
        }
        else {
            next(e);
        }
    }

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
