const wrapPromise = require('../utils/wrapPromise');

module.exports = function (type, roles, self = []) {
    return wrapPromise(async function canModifyOtherId(req, res, next) {
        if (req.user && req.user instanceof type && (req.params.id == 'me' || req.params.id == req.user.get('id'))) {
            req.target = req.user;
            return next();
        } else if (req.params.id == 'me') {
            return res.status(403).json({
                status: 0,
                message: "Can't modify, you're not of the right type",
                data: {}
            });
        } else if (roles.indexOf("anonymous") > -1 || (req.user && roles.indexOf(req.user.constructor) > -1)) {
            req.target = await type.forge({ id: req.params.id }).fetch();
            return next();
        } else {
            return res.status(403).json({
                status: 0,
                message: "You don't have access to this ressource",
                data: {}
            });
        }
    });
};
