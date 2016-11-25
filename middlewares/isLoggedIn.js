const AuthToken = require('../models/AuthToken');
const wrapPromise = require('../utils/wrapPromise');

module.exports = wrapPromise(async function isLoggedIn(req, res, next) {
    let authToken = req.get("Authorization");
    if (authToken) {
        let token = await new AuthToken({ token: authToken }).fetch({withRelated:['user']});
        if (token && token.related('user') && token.related('user').has('id')) {
            req.user = token.related('user');
        }
    }
    return next();
});
