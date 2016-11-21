var Bookshelf = require('../bookshelf');

module.exports = Bookshelf.Model.extend({
    tableName: 'auth_tokens',
    user: function() {
        return this.belongsTo(require('./User'), 'userId');
    },
    coach: function() {
        return this.belongsTo(require('./Coach'), 'coachId');
    },
    admin: function() {
        return this.belongsTo(require('./Admin'), 'adminId');
    }
});
