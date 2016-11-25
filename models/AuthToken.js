var Bookshelf = require('../bookshelf');

module.exports = Bookshelf.Model.extend({
    tableName: 'auth_tokens',
    user: function() {
        return this.belongsTo(require('./User'), 'userId');
    }
});
