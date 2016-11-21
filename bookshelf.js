const knex = require('knex')(require('./knexfile')[process.env.NODE_ENV || "development"]);
const bookshelf = require('bookshelf')(knex);

bookshelf.plugin('visibility');

var st = require('knex-postgis')(bookshelf.knex);
bookshelf.knex.st = st;

bookshelf.knex.postgisDefineExtras(function(knex, formatter) {
    return {
        setSRID: function(geom, srid) {
            return knex.raw('ST_SetSRID(?, ?)', [geom, srid]);
        }
    };
});

module.exports = bookshelf;
