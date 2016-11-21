const Bookshelf = require('../bookshelf');
const bcrypt = require('bcrypt-then');
const _ = require('lodash');

module.exports = Bookshelf.Model.extend({
    tableName: '',
},
{
    like: function(user, body) {
        return user.likePlace().attach(body.place_id);
    }
});
